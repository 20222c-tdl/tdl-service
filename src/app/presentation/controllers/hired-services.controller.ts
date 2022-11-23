import { UseGuards, Controller, Post, Body, ValidationPipe, Get, Param } from "@nestjs/common";
import { ApiTags, ApiBearerAuth, ApiBody, ApiParam } from "@nestjs/swagger";
import { Role } from "../../domain/entities/roles/role.enum";
import { IHiredServices } from "../../domain/interfaces/hired-services.interface";
import { JwtAuthGuard } from "../../infrastructure/auth/jwt/jwt-auth.guard";
import { HasRoles } from "../../infrastructure/decorators/has-roles.decorator";
import { RegisterHiredServicesDTO } from "../../infrastructure/dtos/hired-services/hired-services-register.dto";
import { RolesGuard } from "../../infrastructure/guards/roles.guard";
import { HiredServicesService } from "../services/hired-services.service";

  @ApiTags('Hired Services')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Controller('/hired-services')
  export class HiredServicesController {
    constructor(private readonly hiredServicesService: HiredServicesService) {}

    @ApiBody({ type: RegisterHiredServicesDTO })
    @Post()
    //@HasRoles(Role.USER)
    async registerHiredService(
      @Body(ValidationPipe) newHiredServices: RegisterHiredServicesDTO,
    ): Promise<IHiredServices> {
      return this.hiredServicesService.registerHiredService(newHiredServices);
    }
    
    @ApiParam({
      name: 'userId',
      description: 'ID necessary for getting all user hired services',
      required: true,
      type: String,
    })
    //@HasRoles(Role.USER)
    @Get('/user/:userId')
    async getHiredServicesFromUser(
        @Param('userId') userId: string) {
      return await this.hiredServicesService.getHiredServicesFromUser(userId);
    }
  
  }
  