import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, MinLength } from 'class-validator';

import { ServiceMonetizationType } from '../../../domain/entities/service/service.entity.monetization.type';

export class UpdateServiceDTO {
    @ApiProperty({ type: String, description: 'Title' })
    @IsOptional()
    @MinLength(3)
    title: string;
  
    @ApiProperty({ type: String, description: 'Description' })
    @IsOptional()
    @MinLength(5)
    description: string;
  
    @ApiProperty({ type: Number, description: 'Price' })
    @IsOptional()
    @IsNumber()
    price: number;
  
    @ApiProperty({ enum: ServiceMonetizationType, description: 'Service monetization type' })
    @IsOptional()
    monetizationType: ServiceMonetizationType;
  }