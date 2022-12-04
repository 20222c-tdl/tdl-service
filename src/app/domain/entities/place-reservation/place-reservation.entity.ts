import { ApiProperty } from '@nestjs/swagger';
import { IsBase64, IsEmail, IsUUID, MinLength } from 'class-validator';

export class CreateProviderDto {
  @ApiProperty({ type: String, description: 'Email' })
  @IsEmail()
  id: string;

  @ApiProperty({ type: String, description: 'Place Id' })
  @IsUUID()
  placeId: string;

  @ApiProperty({ type: String, description: 'User Id' })
  @IsUUID()
  userId: string;

  @ApiProperty({ type: Date, description: 'Starting Date' })
  startingDate: Date;
}
