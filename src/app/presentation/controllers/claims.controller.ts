import {
    Body,
    ClassSerializerInterceptor,
    Controller,
    Get,
    Param,
    Post,
    UseInterceptors,
    ValidationPipe
  } from '@nestjs/common';
  import { ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { ClaimsService } from '../services/claims.service';
import { RegisterClaimDTO } from 'src/app/infrastructure/dtos/claims/claim-register.dto';
import Claim from 'src/app/domain/entities/claims/claim.entity';
import { ClaimsByCommunityDTO } from 'src/app/infrastructure/dtos/claims/cliams-by-community.dto';
  
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
    async registerUser(@Body(ValidationPipe) newClaim: RegisterClaimDTO): Promise<Claim> {
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
    async loginUser(
        @Param('communityId') communityId: string): Promise<Claim[]> {
      return this.claimService.getClaimsByCommunity(new ClaimsByCommunityDTO(communityId));
    }
  }