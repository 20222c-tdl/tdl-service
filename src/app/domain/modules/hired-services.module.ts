import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HiredServicesController } from 'src/app/presentation/controllers/hired-services.controller';
import { HiredServicesService } from 'src/app/presentation/services/hired-services.service';

import HiredProvider from '../entities/hired-services/hired-provider.entity';
import HiredService from '../entities/hired-services/hired-service.entity';
import { ProviderModule } from './provider.module';
import { ServicesModule } from './services.module';
import { UsersModule } from './user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([HiredService]),
    TypeOrmModule.forFeature([HiredProvider]),
    ProviderModule,
    UsersModule,
    ServicesModule,
  ],
  controllers: [HiredServicesController],
  providers: [HiredServicesService],
  exports: [HiredServicesService],
})
export class HiredServicesModule {}
