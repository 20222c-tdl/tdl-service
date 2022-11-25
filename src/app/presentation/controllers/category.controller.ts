import { Body, Controller, Get, HttpCode, HttpStatus, Post, Query } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { Category } from '../../domain/entities/categories/category.entity';
import { ApiPaginatedResponse } from '../../infrastructure/decorators/api-paginated-response.decorator';
import { CreateCategoryDto } from '../../infrastructure/dtos/categories/create-category.dto';
import { PageOptionsDto } from '../../infrastructure/dtos/common/pagination/page-options.dto';
import { PageDto } from '../../infrastructure/dtos/common/pagination/page.dto';
import { CategoryService } from '../services/category.service';

@ApiTags('Providers')
@Controller('providers/categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @ApiOkResponse({ type: Category })
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiPaginatedResponse(Category)
  find(@Query() pageOptionsDto: PageOptionsDto): Promise<PageDto<Category>> {
    return this.categoryService.find(pageOptionsDto);
  }
}
