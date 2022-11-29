import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsUUID, Max, Min, MinLength } from 'class-validator';

export class RegisterReviewDTO {
  @ApiProperty({ type: String, description: 'User Id' })
  @IsUUID()
  userId: string;

  @ApiProperty({ type: String, description: 'Provider Id' })
  @IsUUID()
  providerId: string;

  @ApiProperty({ type: String, description: 'Hired services Id' })
  @IsUUID()
  hiredServicesId: string;

  @ApiProperty({ type: Number, description: 'Rating' })
  @IsNumber()
  @Min(0.0)
  @Max(5.0)
  rating: number;

  @ApiProperty({ type: String, description: 'Description' })
  @MinLength(5)
  comment: string;
}