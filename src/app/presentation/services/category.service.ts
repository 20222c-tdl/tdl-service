import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from '../../infrastructure/dtos/categories/create-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from '../../domain/entities/categories/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  create(newCategory: CreateCategoryDto) {
    return this.categoryRepository.save(new Category(newCategory));
  }

  findAll() {
    return this.categoryRepository.find();
  }
}
