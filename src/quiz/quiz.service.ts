import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from } from 'rxjs';
import { Repository } from 'typeorm';
import { QuizEntity } from './models/quiz.entity';
import { Quiz } from './models/quiz.interface';

@Injectable()
export class QuizService {
  constructor(@InjectRepository(QuizEntity) private readonly quizRepository: Repository<QuizEntity>){}
  create(quiz: Quiz) {
    return from(this.quizRepository.save(quiz));
  }

  findAll() {
    return from(this.quizRepository.find());
  }

  findOne(id: number) {
    return from(this.quizRepository.findOne(id));
  }

  update(id: number, quiz: Quiz) {
    return from(this.quizRepository.update(id, quiz));
  }

  remove(id: number) {
    return from(this.quizRepository.delete(id));
  }
}
