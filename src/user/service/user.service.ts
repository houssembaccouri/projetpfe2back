import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { resourceUsage } from 'process';
import { from, map, Observable } from 'rxjs';
import { UserEntity } from 'src/auth/models/user.entity';
import { User } from 'src/auth/models/user.interface';
import { Repository } from 'typeorm';
import {
    paginate,
    Pagination,
    IPaginationOptions,
  } from 'nestjs-typeorm-paginate';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>
    ){}
   

    findAll(): Observable<User[]>{
            return from(this.userRepository.find());
    }

    paginate(options:IPaginationOptions): Observable<Pagination<User>>{
        return from(paginate<User>(this.userRepository, options)).pipe(
            map((usersPageable : Pagination<User>) => {
                usersPageable.items.forEach(function(v) { delete v.password});

                return usersPageable;
            })
        )
    }

    findUser (id: number): Observable<User>{
        return from(this.userRepository.findOne(id));

    }

    public getOne (id: number): Promise<User>{
        return this.userRepository.findOneOrFail({id});
    }

    

   
   
    deleteUser(id: number): Observable<any> {
        return from(this.userRepository.delete(id));
    }

    updateUser(id: number, user:User): Observable<any>{
        return from(this.userRepository.update(id, user));
    }

}
