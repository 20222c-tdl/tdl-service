import { Module } from "@nestjs/common";
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommunityController } from "src/app/presentation/controllers/community,controller";
import { CommunitiesService } from "src/app/presentation/services/community.service";
import Community from "../entities/communities/community.entity";


@Module({
    imports: [TypeOrmModule.forFeature([Community])],
    controllers: [CommunityController],
    providers: [CommunitiesService],
  })
  export class CommunitiesModule {}