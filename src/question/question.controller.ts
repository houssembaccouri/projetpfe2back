import { Controller, Get, Post, Body, Patch, Param, Delete, Request, Put, Query } from '@nestjs/common';
import { Observable } from 'rxjs';
import { QuestionService } from './question.service';
import {Question} from './models/question.interface'



@Controller('question')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Post()
  create(@Body() question: Question, @Request() req) {
    const quiz = req.quiz;
    return this.questionService.create(quiz,question);
  }

  @Get()
  findAll(@Query('quizId') quizId : number) {
    if(quizId == null){
    return this.questionService.findAll();
  } else {
    this.questionService.findOne(quizId)
  }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.questionService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() question: Question) {
    return this.questionService.update(+id, question);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.questionService.remove(+id);
  }
}
