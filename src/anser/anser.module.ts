import { Module } from '@nestjs/common';
import { AnserService } from './anser.service';
import { AnserController } from './anser.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnserEntity } from './models/anser.entity';
import { QuestionModule } from 'src/question/question.module';

@Module({
  imports:[
    TypeOrmModule.forFeature([AnserEntity]),
    QuestionModule
  ],
  controllers: [AnserController],
  providers: [AnserService]
})
export class AnserModule {}
