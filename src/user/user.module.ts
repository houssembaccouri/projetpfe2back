import { HttpModule, Module } from '@nestjs/common';
import { UserService } from './service/user.service';

import { UserController } from './controller/user.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/auth/models/user.entity';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([UserEntity])],
  providers: [UserService,ConfigService],
  controllers: [UserController],
  exports:[UserService],
})
export class UserModule {}
