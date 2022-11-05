import { Body, Controller, Get, Post } from '@nestjs/common';
import { CategoryService } from '../services/category.service';
import { CreateCategoryDto } from '../../infrastructure/dtos/categories/create-category.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('providers')
@Controller('providers/categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  @Get()
  findAll() {
    return this.categoryService.findAll();
  }
}
