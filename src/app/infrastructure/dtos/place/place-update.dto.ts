import { ApiProperty } from '@nestjs/swagger';
import { IsBase64, IsOptional, MinLength } from 'class-validator';

export class UpdatePlaceDTO {
  @ApiProperty({ type: String, description: 'Name' })
  @IsOptional()
  @MinLength(3)
  name: string;

  @ApiProperty({ type: String, description: 'Description' })
  @IsOptional()
  @MinLength(5)
  description: string;

  @ApiProperty({ type: String, description: 'Profile photo' })
  @IsOptional()
  @IsBase64()
  photo: string;
}
