import { ApiProperty } from '@nestjs/swagger';
import { MinLength } from 'class-validator';

export class UpdateUserPasswordDTO {
  @ApiProperty({ type: String, description: 'Old Password' })
  @MinLength(6)
  oldPassword: string;

  @ApiProperty({ type: String, description: 'New Password' })
  @MinLength(6)
  newPassword: string;
}
