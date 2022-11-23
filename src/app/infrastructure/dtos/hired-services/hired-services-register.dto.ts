import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsUUID, ValidateNested } from 'class-validator';
import { RegisterHiredServiceDTO } from './hired-service-register.dto';

export class RegisterHiredServicesDTO {
  @ApiProperty({ type: String, description: 'User Id' })
  @IsUUID()
  userId: string;

  @ApiProperty({ type: String, description: 'Provider Id' })
  @IsUUID()
  providerId: string;

  @ApiProperty({ type: [RegisterHiredServiceDTO], description: 'Hired services' })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => RegisterHiredServiceDTO)
  hiredServices: RegisterHiredServiceDTO[];

  @ApiProperty({ type: Date, description: 'Date' })
  date: Date;
}