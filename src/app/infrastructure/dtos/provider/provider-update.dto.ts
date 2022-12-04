import { ApiProperty } from '@nestjs/swagger';
import { IsBase64, IsOptional, MinLength } from 'class-validator';

export class UpdateProviderDTO {
  @ApiProperty({ type: String, description: 'First Name' })
  @IsOptional()
  @MinLength(3)
  firstName: string;

  @ApiProperty({ type: String, description: 'Last Name' })
  @IsOptional()
  @MinLength(2)
  lastName: string;

  @ApiProperty({ type: String, description: 'Address' })
  @IsOptional()
  identityNumber: string;

  @ApiProperty({ type: String, description: 'Phone Number' })
  @IsOptional()
  phoneNumber: string;

  @ApiProperty({ type: String, description: 'Profile photo' })
  @IsOptional()
  @IsBase64()
  photo: string;
}