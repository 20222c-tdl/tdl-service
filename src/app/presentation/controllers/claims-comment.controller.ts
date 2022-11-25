import { Body, Controller, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';

import ClaimComment from '../../domain/entities/claims-comment/claim-comment.entity';
import { Role } from '../../domain/entities/roles/role.enum';
import { JwtAuthGuard } from '../../infrastructure/auth/jwt/jwt-auth.guard';
import { HasRoles } from '../../infrastructure/decorators/has-roles.decorator';
import { RegisterClaimCommentDTO } from '../../infrastructure/dtos/claim-comment/claim-comment-register.dto';
import { RolesGuard } from '../../infrastructure/guards/roles.guard';
import { ClaimCommentService } from '../services/claim-comment.service';

@ApiTags('Comments')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('/claim-comments')
export class ClaimCommentController {
  constructor(private readonly claimComentService: ClaimCommentService) {}

  @ApiBody({ type: RegisterClaimCommentDTO })
  @Post()
  @HasRoles(Role.USER, Role.COMMUNITY)
  async registerClaimComment(@Body(ValidationPipe) newClaimComment: RegisterClaimCommentDTO): Promise<ClaimComment> {
    return this.claimComentService.registerClaimComment(newClaimComment);
  }

}
