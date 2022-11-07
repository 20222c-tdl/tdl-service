import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from '../../infrastructure/dtos/categories/create-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from '../../domain/entities/categories/category.entity';
import { Repository } from 'typeorm';
import { PageMetaDto } from '../../infrastructure/dtos/common/page-meta.dto';
import { PageDto } from '../../infrastructure/dtos/common/page.dto';
import { PageOptionsDto } from '../../infrastructure/dtos/common/page-options.dto';

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
