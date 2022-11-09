import { Module } from "@nestjs/common";
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClaimsController } from "src/app/presentation/controllers/claims.controller";
import { ClaimsService } from "src/app/presentation/services/claims.service";
import { CommunitiesService } from "src/app/presentation/services/community.service";
import { UsersService } from "src/app/presentation/services/users.service";
import Claim from "../entities/claims/claim.entity";
import Community from "../entities/communities/community.entity";
import User from "../entities/users/user.entity";
import { CommunitiesModule } from "./community.module";
import { UsersModule } from "./user.module";


@Module({
    imports: [TypeOrmModule.forFeature([Claim]), CommunitiesModule, TypeOrmModule.forFeature([Community]), UsersModule, TypeOrmModule.forFeature([User])],
    controllers: [ClaimsController],
    providers: [ClaimsService, CommunitiesService, UsersService],
  })
  export class ClaimsModule {}