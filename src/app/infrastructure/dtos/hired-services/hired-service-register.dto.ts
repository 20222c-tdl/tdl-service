import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsUUID } from 'class-validator';

export class RegisterHiredServiceDTO {
  @ApiProperty({ type: String, description: 'User Id' })
  @IsUUID()
  serviceId: string;

  @ApiProperty({ type: Number, description: 'Amount of hours' })
  @IsNumber()
  @IsOptional()
  hours?: number;
}