import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsIdentityCard,
  IsPhoneNumber,
  IsUUID,
  MinLength,
} from 'class-validator';

export class CreateProviderDto {
  @ApiProperty({ type: String, description: 'Email' })
  @IsEmail()
  email: string;

  @ApiProperty({ type: String, description: 'Password' })
  @MinLength(6)
  password: string;

  @ApiProperty({ type: String, description: 'First Name' })
  @MinLength(3)
  firstName: string;

  @ApiProperty({ type: String, description: 'Last Name' })
  @MinLength(2)
  lastName: string;

  @ApiProperty({ type: String, description: 'Identity Number' })
  @IsIdentityCard('any')
  identityNumber: string;

  @ApiProperty({ type: String, description: 'Phone Number' })
  @IsPhoneNumber('AR')
  phoneNumber: string;

  @ApiProperty({ type: String, description: 'Community Id' })
  @IsUUID()
  categoryId: string;
}
