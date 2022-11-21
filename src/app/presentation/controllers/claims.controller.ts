import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { ClaimsService } from '../services/claims.service';
import { RegisterClaimDTO } from '../../infrastructure/dtos/claims/claim-register.dto';
import Claim from '../../domain/entities/claims/claim.entity';
import { ClaimsByCommunityDTO } from '../../infrastructure/dtos/claims/claims-by-community.dto';
import User from '../../domain/entities/users/user.entity';
import { ClaimStatus } from '../../domain/entities/claims/claim.entity.status';
import { ClaimsByUserDTO } from '../../infrastructure/dtos/claims/claims-by-user.dto';
import { UpdateClaimDTO } from '../../infrastructure/dtos/claims/claim-update.dto';
import { JwtAuthGuard } from '../../../auth/jwt-auth.guard';
import { Role } from '../../domain/entities/roles/role.enum';
import { HasRoles } from '../../../auth/has-roles.decorator';
import { RolesGuard } from '../../../auth/roles.guard';

@ApiTags('Claims')
@Controller('/claims')
export class ClaimsController {
  constructor(private readonly claimService: ClaimsService) {}

  @ApiBearerAuth()
  @ApiBody({ type: RegisterClaimDTO })
  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @HasRoles(Role.USER)
  async registerClaim(@Body(ValidationPipe) newClaim: RegisterClaimDTO): Promise<Claim> {
    return this.claimService.registerClaim(newClaim);
  }

  // TODO: solo un Community puede consumirlo
  //  y el param communityId debe coincider con el sub del token
  @ApiParam({
    name: 'communityId',
    description: 'ID necessary for getting all community claims',
    required: true,
    type: String,
  })
  @Get('/community/:communityId')
  async getClaimsByCommunity(
    @Param('communityId') communityId: string): Promise<{ claim: Claim, user: User }[]> {
    return await this.claimService.getClaimsByCommunity(new ClaimsByCommunityDTO(communityId));
  }

  // TODO: ¿quien lo consume?
  @ApiParam({
    name: 'userId',
    description: 'ID necessary for getting all user claims',
    required: true,
    type: String,
  })
  @Get('/user/:userId')
  async getClaimsByUser(
    @Param('userId') userId: string): Promise<Claim[]> {
    return await this.claimService.getClaimsByUser(new ClaimsByUserDTO(userId));
  }

  // TODO: user creador y community
  @ApiParam({
    name: 'claimId',
    description: 'ID necessary for updating claim status',
    required: true,
    type: String,
  })
  @ApiParam({
    name: 'status',
    description: 'Status necessary for updating claim status',
    required: true,
    enum: ClaimStatus,
  })
  @Patch('/:claimId/status/:status')
  async updateClaimStatus(
    @Param('claimId') claimId: string,
    @Param('status') status: ClaimStatus): Promise<Claim> {
    return this.claimService.updateClaimStatus(claimId, status);
  }

  // TODO: solo el user creador puede modificarlo
  @ApiParam({
    name: 'claimId',
    description: 'ID necessary for updating claim status',
    required: true,
    type: String,
  })
  @ApiBody({ type: UpdateClaimDTO })
  @Patch('/:claimId')
  async updateClaim(
    @Param('claimId') claimId: string,
    @Body(ValidationPipe) updateClaimDto: UpdateClaimDTO): Promise<Claim> {
    return this.claimService.updateClaim(claimId, updateClaimDto);
  }
}
