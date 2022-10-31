import {
    Body,
    ClassSerializerInterceptor,
    Controller,
    Get,
    Post,
    UseInterceptors,
    ValidationPipe
  } from '@nestjs/common';
  import { ApiBody, ApiTags } from '@nestjs/swagger';
import Community from 'src/app/domain/entities/communities/community.entity';
import { CommunitiesService } from '../services/community.service';
import { RegisterCommunityDTO } from 'src/app/infrastructure/dtos/communities/community-register.dto';
import { LoginCommunityDTO } from 'src/app/infrastructure/dtos/communities/community-login.dto';
RegisterCommunityDTO
  @UseInterceptors(ClassSerializerInterceptor)
  @Controller('/communities')
  export class CommunityController {
    constructor(private readonly communitiesService: CommunitiesService) {}
  
    @ApiTags('communities')
    @Get('/status')
    getStatus(): string {
      return this.communitiesService.getStatus();
    }

    @ApiTags('communities')
    @Get()
    async getAllCommunities(): Promise<Community[]> {
      return this.communitiesService.getAllCommunities();
    }
  
    @ApiTags('communities')
    @ApiBody({ type: RegisterCommunityDTO })
    @Post()
    async registerCommunity(@Body(ValidationPipe) newCommunity: RegisterCommunityDTO): Promise<Community> {
      return this.communitiesService.registerCommunity(newCommunity);
    }
  
    @ApiTags('communities')
    @ApiBody({ type: LoginCommunityDTO })
    @Post('/community/login')
    async loginCommunity(@Body(ValidationPipe) communityCredentials: LoginCommunityDTO): Promise<Community> {
      return this.communitiesService.loginCommunity(communityCredentials);
    }
  }
  