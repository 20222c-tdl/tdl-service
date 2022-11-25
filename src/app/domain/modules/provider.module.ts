import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CategoryController } from '../../presentation/controllers/category.controller';
import { ProviderController } from '../../presentation/controllers/provider.controller';
import { CategoryService } from '../../presentation/services/category.service';
import { ProviderService } from '../../presentation/services/provider.service';
import { Category } from '../entities/categories/category.entity';
import { Provider } from '../entities/provider/provider.entity';
import { ReviewModule } from './review.module';
import { UsersModule } from './user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Category]),
    TypeOrmModule.forFeature([Provider]),
    ReviewModule,
    UsersModule,
  ],
  controllers: [CategoryController, ProviderController],
  providers: [CategoryService, ProviderService],
  exports: [ProviderService]
})
export class ProviderModule {}
