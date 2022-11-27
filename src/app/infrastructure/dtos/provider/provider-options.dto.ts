import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsUUID } from 'class-validator';

import { PageOptionsDto } from '../common/pagination/page-options.dto';

export class ProviderOptionsDto extends PageOptionsDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  readonly categoryId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  readonly searchedWords?: string;
}
