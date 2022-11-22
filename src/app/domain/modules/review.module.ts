import { Module } from '@nestjs/common';
import { ProviderService } from '../../presentation/services/provider.service';
import { ProviderController } from '../../presentation/controllers/provider.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Provider } from '../entities/provider/provider.entity';
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
    TypeOrmModule.forFeature([Provider]),
    TypeOrmModule.forFeature([Community]),
  ],
  controllers: [ReviewController, ProviderController, UsersController, CommunityController],
  providers: [ReviewService, ProviderService, UsersService, CommunitiesService],
})
export class ReviewModule {}
