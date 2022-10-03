import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { format } from 'path';
import { from, map, Observable } from 'rxjs';
import { Quiz } from 'src/quiz/models/quiz.interface';
import { Repository } from 'typeorm';
import { QuestionEntity } from './models/question.entity';
import { Question } from './models/question.interface';


@Injectable()
export class QuestionService {
  constructor( 
    @InjectRepository(QuestionEntity) private readonly questionRepository: Repository<QuestionEntity> ,
    
    ){}
    create(quiz:Quiz,question: Question) {
      return from(this.questionRepository.save(question));
    }

  findAll() {
    return from(this.questionRepository.find({relations: ['quiz']}));
    
    
  }

  findOne(id: number) {
   return from(this.questionRepository.findOne({id}, { relations: ['quiz']}) )
    
    
  }

  update(id: number, Question: Question) {
    return from(this.questionRepository.update(id,Question));
  }

  remove(id: number) {
    return from(this.questionRepository.delete(id));
  }
}
