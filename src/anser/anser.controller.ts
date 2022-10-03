import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AnserService } from './anser.service';
import { CreateAnserDto } from './dto/create-anser.dto';
import { UpdateAnserDto } from './dto/update-anser.dto';
import { Anser } from './models/anser.interface';

@Controller('anser')
export class AnserController {
  constructor(private readonly anserService: AnserService) {}

  @Post()
  create(@Body() anser: Anser) {
    return this.anserService.create(anser);
  }

  @Get()
  findAll() {
    return this.anserService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.anserService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAnserDto: UpdateAnserDto) {
    return this.anserService.update(+id, updateAnserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.anserService.remove(+id);
  }
}
