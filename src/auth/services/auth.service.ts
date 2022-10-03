import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';

import * as bcrypt from 'bcrypt';
import { from, Observable } from 'rxjs';
import { map, switchMap} from 'rxjs/operators';
import { UserService } from 'src/user/service/user.service';
import { Repository } from 'typeorm';
import { AuthModule } from '../auth.module';
import { ForgetPassword } from '../models/forget-password';
import { UserEntity } from '../models/user.entity';
import { User } from '../models/user.interface';
@Injectable()
export class AuthService {

    constructor(@InjectRepository(UserEntity)
    private readonly userRepository : Repository<UserEntity>,private jwtService: JwtService,
){
    
    }


    hashPassword(password:string) : Promise<string>{
        return bcrypt.hash(password,12);
    }


/*    registerAccount(user:User): Observable<User> {
        const { firstname, lastname,email, password} = user;
    
        return this.hashPassword(password).pipe(
            switchMap((hashedPassword: string) => {
                return from(this.userRepository.save({
                    firstname,
                    lastname,
                    email,
                    password: hashedPassword
                })).pipe(
                    map((user:User) => {
                        delete user.password;
                        return user;
                    })
                )

            }),
        );
    
    }
*/


    async registerAccount(user:User): Promise<User> {
    try{

        const exists: Boolean = await this.mailExists(user.email);
        if(!exists) {
            const passwordHash: string = await this.hashPassword(user.password);
            user.password = passwordHash;
            const newuser = await this.userRepository.save(this.userRepository.create(user))
            return this.findOne(newuser.id)
        }else{
            throw new HttpException('Email is already in use', HttpStatus.CONFLICT)
        }

    }catch{
        throw new HttpException('Email is already in use', HttpStatus.CONFLICT)
    }

}

    validateUser(email: string, password: string) :Observable<User>{
        return from(this.userRepository.findOne({ email}, { select:['id', 'firstname', 'lastname', 'email', 'password', 'role'],})).pipe(
            switchMap((user:User) => 
            from(bcrypt.compare(password, user.password)).pipe(
                map((isValidPassword: boolean) =>{
                    if(isValidPassword) {
                        delete user.password;
                        return user;
                    }
                })
            )
            )
        )

    }


   login(user:User): Observable<string> {
       try{
        const { email, password} = user;
        return this.validateUser(email, password).pipe(
            switchMap((user: User) => {
                if(user) {
                    return from(this.jwtService.signAsync({ user}));
                }
            })
        )
       }catch{
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
       }
     
    }


    private async mailExists  (email: string): Promise<Boolean>{
        const user = await this.userRepository.findOne({email});
        if(user){
            return true;
        }else{
            return false;
        }

    }

    findByEmail(email:string): Observable<User> {
        return from(this.userRepository.findOne({ email}, { select : ['id', 'firstname', 'lastname', 'email', 'password', 'role']}));
    }

    private async findOne (id: number): Promise<User>{
        return this.userRepository.findOne(id);

    }

   /* async forgetPassword(forgetPassword: ForgetPassword){
       const useremail= this.userService.findByEmail(forgetPassword.email);
       if(!useremail){
            throw new BadRequestException('invalid email');
        }

        /*const token = await this.registerAccount(User);

        const forgetLink = `${ this.clientAppUrl}/auth/forgetPassword?token=${token}`;
        await this.mailService.send({
            from: this.configService.get<string>
        })


        

    }*/



}


