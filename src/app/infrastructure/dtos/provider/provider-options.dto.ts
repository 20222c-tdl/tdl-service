import { IsOptional, IsUUID } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { PageOptionsDto } from '../common/pagination/page-options.dto';

export class ProviderOptionsDto extends PageOptionsDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  readonly categoryId?: string;
}
