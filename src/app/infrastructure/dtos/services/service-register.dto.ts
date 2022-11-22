import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsUUID, MinLength } from 'class-validator';
import { ServiceMonetizationType } from 'src/app/domain/entities/service/service.entity.monetization.type';

export class RegisterServiceDTO {
  @ApiProperty({ type: String, description: 'Title' })
  @MinLength(3)
  title: string;

  @ApiProperty({ type: String, description: 'Description' })
  @MinLength(5)
  description: string;

  @ApiProperty({ type: Number, description: 'Price' })
  @IsNumber()
  price: number;

  @ApiProperty({ enum: ServiceMonetizationType, description: 'Service monetization type' })
  monetizationType: ServiceMonetizationType;

  @ApiProperty({ type: String, description: 'Provider Id' })
  @IsUUID()
  providerId: string;
}