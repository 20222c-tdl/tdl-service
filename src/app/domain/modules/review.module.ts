import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import User from '../entities/users/user.entity';
import Review from '../entities/review/review.entity';
import { ReviewController } from 'src/app/presentation/controllers/review.controller';
import { ReviewService } from 'src/app/presentation/services/review.service';
import { UsersController } from 'src/app/presentation/controllers/users.controller';
import { UsersService } from 'src/app/presentation/services/users.service';
import { CommunityController } from 'src/app/presentation/controllers/community.controller';
import { CommunitiesService } from 'src/app/presentation/services/community.service';
import Community from '../entities/communities/community.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Review]),
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([Community]),
  ],
  controllers: [ReviewController, UsersController, CommunityController],
  providers: [ReviewService , UsersService, CommunitiesService],
})
export class ReviewModule {}
