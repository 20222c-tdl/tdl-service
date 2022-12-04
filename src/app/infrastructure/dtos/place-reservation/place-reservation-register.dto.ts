import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class RegisterPlaceReservationDTO {
  @ApiProperty({ type: String, description: 'Place Id' })
  @IsUUID()
  placeId: string;

  @ApiProperty({ type: String, description: 'User Id' })
  @IsUUID()
  userId: string;

  @ApiProperty({ type: Date, description: 'Starting Date' })
  startingDate: Date;

  @ApiProperty({ type: Date, description: 'Starting Date' })
  endingDate: Date;
}
