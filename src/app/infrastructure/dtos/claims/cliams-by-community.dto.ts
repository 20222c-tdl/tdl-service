import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsUUID, MinLength } from 'class-validator';

export class ClaimsByCommunityDTO {
  @ApiProperty({ type: String, description: 'Community Id' })
  @IsUUID()
  communityId: string;
}