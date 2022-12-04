import { ApiProperty } from '@nestjs/swagger';
import { IsBase64, IsEmail, IsUUID, MinLength } from 'class-validator';

export class UpdateUserPasswordDTO {
  @ApiProperty({ type: String, description: 'Old Password' })
  @IsEmail()
  oldPassword: string;

  @ApiProperty({ type: String, description: 'New Password' })
  @MinLength(6)
  newPassword: string;

}