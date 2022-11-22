import {
    Body,
    ClassSerializerInterceptor,
    Controller,
    Get,
    Param,
    Post,
    UseInterceptors,  
    ValidationPipe} from '@nestjs/common';
import { ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import Service from '../../domain/entities/service/service.entity';
import { RegisterServiceDTO } from '../../infrastructure/dtos/services/service-register.dto';
import { ServicesService } from '../services/services.service';

  @UseInterceptors(ClassSerializerInterceptor)
  @Controller('/services')
  export class ServicesController {
    constructor(private readonly servicesService: ServicesService) {}

    @ApiTags('services')
    @ApiBody({ type: RegisterServiceDTO })
    @Post()
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
    @Get('/provider/:providerId')
    async getServicesFromProvider(
        @Param('providerId') providerId: string): Promise<Service[]> {
      return await this.servicesService.getServicesFromProvider(providerId);
    }
  
  }
  