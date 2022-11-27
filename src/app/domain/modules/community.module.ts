import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CommunityController } from '../../presentation/controllers/community.controller';
import { PlaceController } from '../../presentation/controllers/place.controller';
import { CommunitiesService } from '../../presentation/services/community.service';
import { PlaceService } from '../../presentation/services/place.service';
import Community from '../entities/communities/community.entity';
import Place from '../entities/place/place.entity';


@Module({
  imports: [
    TypeOrmModule.forFeature([Community]),
    TypeOrmModule.forFeature([Place]),
  ],
  controllers: [CommunityController, PlaceController],
  providers: [CommunitiesService, PlaceService],
  exports: [CommunitiesService, PlaceService]
})
export class CommunitiesModule {}
