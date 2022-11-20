import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommunityController } from '../../presentation/controllers/community.controller';
import { CommunitiesService } from '../../presentation/services/community.service';
import Community from '../entities/communities/community.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Community])],
  controllers: [CommunityController],
  providers: [CommunitiesService],
  exports: [CommunitiesService]
})
export class CommunitiesModule {}
