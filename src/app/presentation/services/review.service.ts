import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProviderService } from './provider.service';
import Review from '../../domain/entities/review/review.entity';
import { UsersService } from './users.service';
import { RegisterReviewDTO } from '../../infrastructure/dtos/reviews/review-register.dto';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review)
    private reviewRepository: Repository<Review>,
    private readonly userService: UsersService,
  ) {}


  async registerReview(newReview: RegisterReviewDTO): Promise<Review> {
    if (await !this.userService.existsUser(newReview.providerId)) {
        throw new BadRequestException('The user does not exist!');
      }
    return this.reviewRepository.save(new Review(newReview));
  }

  async getReviewsFromProvider(providerId: string): Promise<{reviews: Review[], totalRating: number}> {
    const reviews = await this.reviewRepository.find({ where: { providerId } });

    let totalRating = 0;
    if(reviews.length>0)
      totalRating = (await reviews).reduce((acc, review) => acc + review.rating, 0)/reviews.length;
      
    return {reviews, totalRating};
  }

}
