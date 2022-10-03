import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { Observable } from 'rxjs';
import { CategoryService } from './category.service';
import { Category } from './models/category.interface';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  create(@Body() category: Category):Observable<Category> {
    return this.categoryService.create(category);
  }

  @Get()
  findAll():Observable<Category[]>  {
    return this.categoryService.findAll();
  }

  @Get(':id')
  findOne(@Param() params):Observable<Category>  {
    return this.categoryService.findOne(params.id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() category: Category): Observable<any>{
      return this.categoryService.update(+id, category);
  
  }

  @Delete(':id')
  remove(@Param('id') id: string):Observable<Category>  {
    return this.categoryService.remove(+id);
  }
}
