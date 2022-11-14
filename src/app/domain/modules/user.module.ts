import { Module } from "@nestjs/common";
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from "../../presentation/controllers/users.controller";
import { CommunitiesService } from "../../presentation/services/community.service";
import { UsersService } from "../../presentation/services/users.service";
import Community from "../entities/communities/community.entity";
import User from "../entities/users/user.entity";
import { CommunitiesModule } from "./community.module";


@Module({
    imports: [TypeOrmModule.forFeature([User]), CommunitiesModule, TypeOrmModule.forFeature([Community])],
    controllers: [UsersController],
    providers: [UsersService, CommunitiesService],
  })
  export class UsersModule {}