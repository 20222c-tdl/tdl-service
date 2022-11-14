import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, MinLength } from 'class-validator';

export class UpdateClaimDTO {

  @ApiProperty({ type: String, description: 'Type' })
  @IsOptional()
  @MinLength(2)
  type: string;

  @ApiProperty({ type: String, description: 'Main Issue' })
  @IsOptional()
  @MinLength(3)
  mainIssue: string;

  @ApiProperty({ type: String, description: 'Description' })
  @IsOptional()
  @MinLength(6)
  description: string;

}