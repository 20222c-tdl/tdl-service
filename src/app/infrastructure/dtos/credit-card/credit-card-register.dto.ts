import { ApiProperty } from '@nestjs/swagger';
import { IsBase64, IsEmail, IsUUID, MinLength } from 'class-validator';

export class RegisterCreditCardDTO {

  @ApiProperty({ type: String, description: 'User Id' })
  @IsUUID()
  userId: string;

  @ApiProperty({ type: String, description: 'Number' })
  @MinLength(12)
  number: string;

  @ApiProperty({ type: String, description: 'Name' })
  @MinLength(2)
  name: string;

  @ApiProperty({ type: String, description: 'Expiration date' })
  expirationDate: string;

  @ApiProperty({ type: String, description: 'CVC' })
  @MinLength(3)
  cvc: string;

}