import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, MinLength } from 'class-validator';

export class RegisterCommunityDTO {
  @ApiProperty({ type: String, description: 'Name' })
  @MinLength(3)
  name: string;

  @ApiProperty({ type: String, description: 'Email' })
  @IsEmail()
  email: string;

  @ApiProperty({ type: String, description: 'Password' })
  @MinLength(6)
  password: string;

}