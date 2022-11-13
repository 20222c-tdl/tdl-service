import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class ClaimsByUserDTO {
  @ApiProperty({ type: String, description: 'User Id' })
  @IsUUID()
  userId: string;

  constructor(userId: string) {
    this.userId = userId;
  }
}