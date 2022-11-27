import { ApiProperty } from '@nestjs/swagger';
import { IsBase64, IsEmail, IsUUID, MinLength } from 'class-validator';

export class RegisterUserDTO {
  @ApiProperty({ type: String, description: 'First Name' })
  @MinLength(3)
  firstName: string;

  @ApiProperty({ type: String, description: 'Last Name' })
  @MinLength(2)
  lastName: string;

  @ApiProperty({ type: String, description: 'Email' })
  @IsEmail()
  email: string;

  @ApiProperty({ type: String, description: 'Password' })
  @MinLength(6)
  password: string;

  @ApiProperty({ type: String, description: 'Address' })
  address: string;

  @ApiProperty({ type: String, description: 'Phone Number' })
  phoneNumber: string;

  @ApiProperty({ type: String, description: 'Community Id' })
  @IsUUID()
  communityId: string;

  @ApiProperty({ type: String, description: 'Profile photo' })
  @IsBase64()
  photo: string;
}