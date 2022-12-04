import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

import Community from '../../domain/entities/communities/community.entity';
import { LoginCommunityDTO } from '../../infrastructure/dtos/communities/community-login.dto';
import { RegisterCommunityDTO } from '../../infrastructure/dtos/communities/community-register.dto';
import { CommunitiesService } from '../services/community.service';

@ApiTags('Communities')
@Controller('/communities')
export class CommunityController {
  constructor(private readonly communitiesService: CommunitiesService) {}

  @Get()
  async getAllCommunities(): Promise<Community[]> {
    return this.communitiesService.getAllCommunities();
  }

  @Get('/community/profile/:id')
  async getCommunityPorfile(@Param('id') id: string): Promise<Community> {
    return this.communitiesService.getCommunity(id);
  }

  @ApiBody({ type: RegisterCommunityDTO })
  @Post()
  async registerCommunity(
    @Body(ValidationPipe) newCommunity: RegisterCommunityDTO,
  ): Promise<Community> {
    return this.communitiesService.registerCommunity(newCommunity);
  }

  @ApiOperation({ deprecated: true })
  @ApiBody({ type: LoginCommunityDTO })
  @Post('/community/login')
  async loginCommunity(
    @Body(ValidationPipe) communityCredentials: LoginCommunityDTO,
  ): Promise<Community> {
    return this.communitiesService.loginCommunity(communityCredentials);
  }
}
