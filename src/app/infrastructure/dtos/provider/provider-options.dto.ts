import { IsOptional, IsUUID } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class ProviderOptionsDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  categoryId: string;
}
