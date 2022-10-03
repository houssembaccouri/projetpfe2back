import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user.interface';
import { ForgetPassword } from '../models/forget-password';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService){}

    @Post('register')
    register(@Body() user: User) : Promise<User>
    {
        console.log('user==>', user);
        return this.authService.registerAccount(user);
    }


    @Post('login')
    login (@Body() user: User): Observable<{token :string}> {
        console.log('user==>', user);
        return this.authService.login(user).pipe( map((jwt:string)=> ({ token: jwt})));

        function newFunction(): string | string[] {
            return 'login';
        }
        
    }




    @Post('forgetPassword')
    async forgetPassword(@Body(new ValidationPipe() ) forgetPassword:ForgetPassword): Promise<void> {

    }
}
