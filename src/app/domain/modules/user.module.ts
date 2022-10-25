import { Module } from "@nestjs/common";
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from "src/app/presentation/controllers/users.controller";
import { UsersService } from "src/app/presentation/services/usesr.service";
import User from "../entities/user.entity";


@Module({
    imports: [TypeOrmModule.forFeature([User])],
    controllers: [UsersController],
    providers: [UsersService],
  })
  export class UsersModule {}