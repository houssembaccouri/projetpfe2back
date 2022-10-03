import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import {CategoryEntity} from './models/category.entity'
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';


@Module({
  imports: [
   TypeOrmModule.forFeature([CategoryEntity]),
   
  ],
  controllers: [CategoryController],
  providers: [CategoryService]
})
export class CategoryModule {}
