import { Body, Controller, Get, Param, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';

import Review from '../../domain/entities/review/review.entity';
import { Role } from '../../domain/entities/roles/role.enum';
import User from '../../domain/entities/users/user.entity';
import { JwtAuthGuard } from '../../infrastructure/auth/jwt/jwt-auth.guard';
import { HasRoles } from '../../infrastructure/decorators/has-roles.decorator';
import { RegisterReviewDTO } from '../../infrastructure/dtos/reviews/review-register.dto';
import { RolesGuard } from '../../infrastructure/guards/roles.guard';
import { ReviewService } from '../services/review.service';

  @ApiTags('Reviews')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Controller('/reviews')
  export class ReviewController {
    constructor(private readonly reviewService: ReviewService) {}

    
    @ApiBody({ type: RegisterReviewDTO })
    @Post()
    @HasRoles(Role.USER)
    async registerReview(
      @Body(ValidationPipe) newReview: RegisterReviewDTO,
    ): Promise<Review> {
      return this.reviewService.registerReview(newReview);
    }

    @ApiParam({
      name: 'providerId',
      description: 'ID necessary for getting all provider reviews',
      required: true,
      type: String,
    })
    @Get('/provider/:providerId')
    @HasRoles(Role.USER)
    async getReviewsFromProvider(
        @Param('providerId') providerId: string): Promise<{reviews: {review: Review, user: User}[], totalRating: number}> {
      return await this.reviewService.getReviewsFromProvider(providerId);
    }

    @ApiParam({
      name: 'userId',
      description: 'ID necessary for getting all user reviews',
      required: true,
      type: String,
    })
    @Get('/user/:userId')
    @HasRoles(Role.USER)
    async getReviewsFromUser(
        @Param('userId') userId: string): Promise<Review[]> {
      return await this.reviewService.getReviewsFromUser(userId);
    }
  
  }
  