import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';

import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './models/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { JwtGuard } from './gards/jwt.guard';
import { JwtStrategy } from './gards/jwt.strategy';
import { RolesGuard } from './gards/roles.guard';

@Module({
  imports: [
    JwtModule.registerAsync({

      useFactory: () => ({
        secret: process.env.JWT_SECRET,
        signOptions: { expiresIn : '3600s'},
      })
      

    }),
    TypeOrmModule.forFeature([UserEntity])
  ],
  providers: [AuthService, JwtGuard, JwtStrategy, RolesGuard],
  controllers: [AuthController]
})
export class AuthModule {
    findOne: any;
}
