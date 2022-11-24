import { Module } from '@nestjs/common';
import { ProviderService } from '../../presentation/services/provider.service';
import { ProviderController } from '../../presentation/controllers/provider.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Provider } from '../entities/provider/provider.entity';
import { Category } from '../entities/categories/category.entity';
import { CategoryController } from '../../presentation/controllers/category.controller';
import { CategoryService } from '../../presentation/services/category.service';
import Review from '../entities/review/review.entity';
import { ReviewController } from 'src/app/presentation/controllers/review.controller';
import { ReviewService } from 'src/app/presentation/services/review.service';
import { UsersModule } from './user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Category]),
    TypeOrmModule.forFeature([Provider]),
    TypeOrmModule.forFeature([Review]),
    UsersModule,
  ],
  controllers: [CategoryController, ProviderController, ReviewController],
  providers: [CategoryService, ProviderService, ReviewService],
  exports: [ProviderService]
})
export class ProviderModule {}
