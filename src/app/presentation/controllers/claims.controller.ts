import {
    Body,
    ClassSerializerInterceptor,
    Controller,
    Get,
    Param,
    Patch,
    Post,
    UseInterceptors,
    ValidationPipe
  } from '@nestjs/common';
  import { ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { ClaimsService } from '../services/claims.service';
import { RegisterClaimDTO } from 'src/app/infrastructure/dtos/claims/claim-register.dto';
import Claim from 'src/app/domain/entities/claims/claim.entity';
import { ClaimsByCommunityDTO } from 'src/app/infrastructure/dtos/claims/cliams-by-community.dto';
import { UpdateClaimStatusDTO } from 'src/app/infrastructure/dtos/claims/claim-update-status.dto';
import User from 'src/app/domain/entities/users/user.entity';
import { ClaimStatus } from 'src/app/domain/entities/claims/claim.entity.status';
import { ClaimsByUserDTO } from 'src/app/infrastructure/dtos/claims/claims-by-user.dto';
  
  @UseInterceptors(ClassSerializerInterceptor)
  @Controller('/claims')
  export class ClaimsController {
    constructor(private readonly claimService: ClaimsService) {}
  
    @ApiTags('claims')
    @Get()
    getStatus(): string {
      return this.claimService.getStatus();
    }
  
    @ApiTags('claims')
    @ApiBody({ type: RegisterClaimDTO })
    @Post()
    async registerClaim(@Body(ValidationPipe) newClaim: RegisterClaimDTO): Promise<Claim> {
      return this.claimService.registerClaim(newClaim);
    }
  
    @ApiTags('claims')
    @ApiParam({
        name: 'communityId',
        description: 'ID necessary for getting all community claims',
        required: true,
        type: String,
      })
    @Get('/community/:communityId')
    async getClaimsByCommunity(
        @Param('communityId') communityId: string): Promise<{claim: Claim, user: User }[]> {
      return await this.claimService.getClaimsByCommunity(new ClaimsByCommunityDTO(communityId));
    }

    @ApiTags('claims')
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

    @ApiTags('claims')
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
      @Param('status') status: ClaimStatus,): Promise<Claim> {
      return this.claimService.updateClaimStatus(claimId, status);
    }
  }