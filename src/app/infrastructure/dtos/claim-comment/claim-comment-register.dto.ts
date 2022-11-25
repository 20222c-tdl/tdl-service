import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, NotEquals } from 'class-validator';

import { Role } from '../../../domain/entities/roles/role.enum';

export class RegisterClaimCommentDTO {
  @ApiProperty({ type: String, description: 'Claim Id' })
  @IsUUID()
  claimId: string;

  @ApiProperty({ type: String, description: 'Entity Id' })
  @IsUUID()
  entityId: string;

  @ApiProperty({ enum: Role, description: 'Role of the entity that made the comment' })
  @NotEquals(Role[Role.PROVIDER])
  role: Role;

  @ApiProperty({ type: String, description: 'Comment' })
  comment: string;

  @ApiProperty({ type: Date, description: 'Date' })
  date: Date;

}