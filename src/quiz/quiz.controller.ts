import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { Quiz } from './models/quiz.interface';
import { Observable } from 'rxjs';

@Controller('quiz')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @Post()
  create(@Body() quiz: Quiz ) {
    return this.quizService.create(quiz);
  }

  @Get()
  findAll() {
    return this.quizService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.quizService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() quiz:Quiz) {
    return this.quizService.update(+id, quiz);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.quizService.remove(+id);
  }
}
