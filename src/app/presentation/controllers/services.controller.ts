import { Body, Controller, Get, Param, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';

import { Role } from '../../domain/entities/roles/role.enum';
import Service from '../../domain/entities/service/service.entity';
import { JwtAuthGuard } from '../../infrastructure/auth/jwt/jwt-auth.guard';
import { HasRoles } from '../../infrastructure/decorators/has-roles.decorator';
import { RegisterServiceDTO } from '../../infrastructure/dtos/services/service-register.dto';
import { RolesGuard } from '../../infrastructure/guards/roles.guard';
import { ServicesService } from '../services/services.service';

  @ApiTags('Services')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Controller('/services')
  export class ServicesController {
    constructor(private readonly servicesService: ServicesService) {}

    @ApiBody({ type: RegisterServiceDTO })
    @Post()
    @HasRoles(Role.PROVIDER)
    async registerService(
      @Body(ValidationPipe) newService: RegisterServiceDTO,
    ): Promise<Service> {
      return this.servicesService.registerService(newService);
    }
    
    @ApiParam({
      name: 'providerId',
      description: 'ID necessary for getting all provider services',
      required: true,
      type: String,
    })
    @HasRoles(Role.USER, Role.PROVIDER)
    @Get('/provider/:providerId')
    async getServicesFromProvider(
        @Param('providerId') providerId: string): Promise<Service[]> {
      return await this.servicesService.getServicesFromProvider(providerId);
    }
  
  }
  