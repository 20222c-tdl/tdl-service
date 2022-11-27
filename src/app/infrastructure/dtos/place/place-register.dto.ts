import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, MinLength } from 'class-validator';

export class RegisterPlaceDTO {
  @ApiProperty({ type: String, description: 'Community Id' })
  @IsUUID()
  communityId: string;

  @ApiProperty({ type: String, description: 'Name' })
  @MinLength(3)
  name: string;

  @ApiProperty({ type: String, description: 'Description' })
  @MinLength(5)
  description: string;
}