import { Module } from '@nestjs/common';
import { ProviderService } from '../../presentation/services/provider.service';
import { ProviderController } from '../../presentation/controllers/provider.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Provider } from '../entities/provider/provider.entity';
import Service from '../entities/service/service.entity';
import { ServicesController } from '../../presentation/controllers/services.controller';
import { ServicesService } from '../../presentation/services/services.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Service]),
    TypeOrmModule.forFeature([Provider]),
  ],
  controllers: [ServicesController, ProviderController],
  providers: [ServicesService, ProviderService],
})
export class ServicesModule {}
