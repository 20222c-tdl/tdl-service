import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Category } from '../../domain/entities/categories/category.entity';
import { CreateCategoryDto } from '../../infrastructure/dtos/categories/create-category.dto';
import { PageMetaDto } from '../../infrastructure/dtos/common/pagination/page-meta.dto';
import { PageOptionsDto } from '../../infrastructure/dtos/common/pagination/page-options.dto';
import { PageDto } from '../../infrastructure/dtos/common/pagination/page.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  create(newCategory: CreateCategoryDto) {
    return this.categoryRepository.save(new Category(newCategory));
  }

  async find(pageOptionsDto: PageOptionsDto) {
    const queryBuilder = this.categoryRepository
      .createQueryBuilder('provider')
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.take);

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    const pageMetaDto = new PageMetaDto(pageOptionsDto, itemCount);

    return new PageDto(entities, pageMetaDto);
  }
}
