import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class ClaimsByCommunityDTO {
  @ApiProperty({ type: String, description: 'Community Id' })
  @IsUUID()
  communityId: string;

  constructor(communityId: string) {
    this.communityId = communityId;
  }
}