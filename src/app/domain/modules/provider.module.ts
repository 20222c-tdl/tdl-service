import { Module } from '@nestjs/common';
import { ProviderService } from '../../presentation/services/provider.service';
import { ProviderController } from '../../presentation/controllers/provider.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Provider } from '../entities/provider/provider.entity';
import { CategoryModule } from './category.module';
import { Category } from '../entities/categories/category.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Provider]),
    CategoryModule,
    TypeOrmModule.forFeature([Category]),
  ],
  controllers: [ProviderController],
  providers: [ProviderService],
})
export class ProviderModule {}
