import { Module } from '@nestjs/common';
import { ProviderService } from '../../presentation/services/provider.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Provider } from '../entities/provider/provider.entity';
import Service from '../entities/service/service.entity';
import { ServicesService } from '../../presentation/services/services.service';
import User from '../entities/users/user.entity';
import { UsersService } from 'src/app/presentation/services/users.service';
import HiredProvider from '../entities/hired-services/hired-provider.entity';
import HiredService from '../entities/hired-services/hired-service.entity';
import { HiredServicesController } from 'src/app/presentation/controllers/hired-services.controller';
import { HiredServicesService } from 'src/app/presentation/services/hired-services.service';
import { ReviewService } from 'src/app/presentation/services/review.service';
import { CommunitiesService } from 'src/app/presentation/services/community.service';
import Review from '../entities/review/review.entity';
import Community from '../entities/communities/community.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([HiredService]),
    TypeOrmModule.forFeature([HiredProvider]),
    TypeOrmModule.forFeature([Service]),
    TypeOrmModule.forFeature([Provider]),
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([Review]),
    TypeOrmModule.forFeature([Community]),
  ],
  controllers: [HiredServicesController],
  providers: [ServicesService, ProviderService, UsersService, HiredServicesService,ReviewService, CommunitiesService],
})
export class HiredServicesModule {}
