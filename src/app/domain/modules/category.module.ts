import { Module } from '@nestjs/common';
import { CategoryService } from '../../presentation/services/category.service';
import { CategoryController } from '../../presentation/controllers/category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from '../entities/categories/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Category])],
  controllers: [CategoryController],
  providers: [CategoryService],
})
export class CategoryModule {}
