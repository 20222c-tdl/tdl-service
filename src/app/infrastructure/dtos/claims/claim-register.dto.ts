import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, MinLength } from 'class-validator';

export class RegisterClaimDTO {
  @ApiProperty({ type: String, description: 'User Id' })
  @IsUUID()
  userId: string;

  @ApiProperty({ type: String, description: 'Community Id' })
  @IsUUID()
  communityId: string;

  @ApiProperty({ type: String, description: 'Type' })
  @MinLength(2)
  type: string;

  @ApiProperty({ type: String, description: 'Main Issue' })
  @MinLength(3)
  mainIssue: string;

  @ApiProperty({ type: String, description: 'Description' })
  @MinLength(6)
  description: string;

}