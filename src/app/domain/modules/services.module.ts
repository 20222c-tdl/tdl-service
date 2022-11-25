import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ServicesController } from '../../presentation/controllers/services.controller';
import { ServicesService } from '../../presentation/services/services.service';
import Service from '../entities/service/service.entity';
import { ProviderModule } from './provider.module';
import { ReviewModule } from './review.module';
import { UsersModule } from './user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Service]),
    ProviderModule,
    ReviewModule,
    UsersModule
  ],
  controllers: [ServicesController],
  providers: [ServicesService],
  exports: [ServicesService],
})
export class ServicesModule {}
