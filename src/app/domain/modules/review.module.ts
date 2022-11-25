import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReviewController } from 'src/app/presentation/controllers/review.controller';
import { ReviewService } from 'src/app/presentation/services/review.service';

import Review from '../entities/review/review.entity';
import { CommunitiesModule } from './community.module';
import { UsersModule } from './user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Review]),
    UsersModule,
    CommunitiesModule,
  ],
  controllers: [ReviewController],
  providers: [ReviewService],
  exports: [ReviewService]
})
export class ReviewModule {}
