import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersController } from '../../presentation/controllers/users.controller';
import { UsersService } from '../../presentation/services/users.service';
import User from '../entities/users/user.entity';
import { CommunitiesModule } from './community.module';


@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    CommunitiesModule,
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
