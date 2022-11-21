import { Body, Controller, Get, Param, Patch, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { ClaimsService } from '../services/claims.service';
import { RegisterClaimDTO } from '../../infrastructure/dtos/claims/claim-register.dto';
import Claim from '../../domain/entities/claims/claim.entity';
import { ClaimsByCommunityDTO } from '../../infrastructure/dtos/claims/claims-by-community.dto';
import User from '../../domain/entities/users/user.entity';
import { ClaimStatus } from '../../domain/entities/claims/claim.entity.status';
import { ClaimsByUserDTO } from '../../infrastructure/dtos/claims/claims-by-user.dto';
import { UpdateClaimDTO } from '../../infrastructure/dtos/claims/claim-update.dto';
import { JwtAuthGuard } from '../../infrastructure/auth/jwt/jwt-auth.guard';
import { Role } from '../../domain/entities/roles/role.enum';
import { HasRoles } from '../../infrastructure/decorators/has-roles.decorator';
import { RolesGuard } from '../../infrastructure/guards/roles.guard';

@ApiTags('Claims')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('/claims')
export class ClaimsController {
  constructor(private readonly claimService: ClaimsService) {}

  @ApiBody({ type: RegisterClaimDTO })
  @Post()
  @HasRoles(Role.USER)
  async registerClaim(@Body(ValidationPipe) newClaim: RegisterClaimDTO): Promise<Claim> {
    return this.claimService.registerClaim(newClaim);
  }

  // TODO: el param communityId debe coincidir con el sub del token
  @ApiParam({
    name: 'communityId',
    description: 'ID necessary for getting all community claims',
    required: true,
    type: String
  })
  @Get('/community/:communityId')
  @HasRoles(Role.COMMUNITY)
  async getClaimsByCommunity(
    @Param('communityId') communityId: string): Promise<{ claim: Claim, user: User }[]> {
    return await this.claimService.getClaimsByCommunity(new ClaimsByCommunityDTO(communityId));
  }

  @ApiParam({
    name: 'userId',
    description: 'ID necessary for getting all user claims',
    required: true,
    type: String,
  })
  @Get('/user/:userId')
  @HasRoles(Role.USER)
  async getClaimsByUser(
    @Param('userId') userId: string): Promise<Claim[]> {
    return await this.claimService.getClaimsByUser(new ClaimsByUserDTO(userId));
  }

  /* TODO: validaciones "Nice To Have"
   * - id de usuario que actualiza === userId del claim && newStatus === 'CLOSED'
   * - id de community que actualiza === communityId del claim
   */
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
  @HasRoles(Role.COMMUNITY, Role.USER)
  async updateClaimStatus(
    @Param('claimId') claimId: string,
    @Param('status') status: ClaimStatus): Promise<Claim> {
    return this.claimService.updateClaimStatus(claimId, status);
  }

  /* TODO: validaciones "Nice To Have"
   * - id de usuario que actualiza === userId del claim
   */
  @ApiParam({
    name: 'claimId',
    description: 'ID necessary for updating claim status',
    required: true,
    type: String,
  })
  @ApiBody({ type: UpdateClaimDTO })
  @Patch('/:claimId')
  @HasRoles(Role.USER)
  async updateClaim(
    @Param('claimId') claimId: string,
    @Body(ValidationPipe) updateClaimDto: UpdateClaimDTO): Promise<Claim> {
    return this.claimService.updateClaim(claimId, updateClaimDto);
  }
}
