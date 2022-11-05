import { ApiProperty } from '@nestjs/swagger';
import { MinLength } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({ type: String, description: 'Name of the Provider category' })
  @MinLength(3)
  name: string;
}
