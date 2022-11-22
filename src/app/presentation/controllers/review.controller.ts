import {
    Body,
    ClassSerializerInterceptor,
    Controller,
    Get,
    Param,
    Post,
    UseInterceptors,  
    ValidationPipe} from '@nestjs/common';
import { ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { RegisterReviewDTO } from '../../infrastructure/dtos/reviews/review-register.dto';
import Review from '../../domain/entities/review/review.entity';
import { ReviewService } from '../services/review.service';

  @UseInterceptors(ClassSerializerInterceptor)
  @Controller('/reviews')
  export class ReviewController {
    constructor(private readonly reviewService: ReviewService) {}

    @ApiTags('reviews')
    @ApiBody({ type: RegisterReviewDTO })
    @Post()
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
    async getServicesFromProvider(
        @Param('providerId') providerId: string): Promise<{reviews: Review[], totalRating: number}> {
      return await this.reviewService.getReviewsFromProvider(providerId);
    }
  
  }
  