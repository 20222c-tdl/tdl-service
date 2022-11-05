import { Module } from '@nestjs/common';
import { ProviderService } from '../../presentation/services/provider.service';
import { ProviderController } from '../../presentation/controllers/provider.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Provider } from '../entities/provider/provider.entity';
import { Category } from '../entities/categories/category.entity';
import { CategoryController } from '../../presentation/controllers/category.controller';
import { CategoryService } from '../../presentation/services/category.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Category]),
    TypeOrmModule.forFeature([Provider]),
  ],
  controllers: [CategoryController, ProviderController],
  providers: [CategoryService, ProviderService],
})
export class ProviderModule {}
