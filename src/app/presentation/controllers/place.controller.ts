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
import { UpdatePlaceDTO } from 'src/app/infrastructure/dtos/place/place-update.dto';

import Place from '../../domain/entities/place/place.entity';
import { Role } from '../../domain/entities/roles/role.enum';
import { JwtAuthGuard } from '../../infrastructure/auth/jwt/jwt-auth.guard';
import { HasRoles } from '../../infrastructure/decorators/has-roles.decorator';
import { RegisterPlaceDTO } from '../../infrastructure/dtos/place/place-register.dto';
import { RolesGuard } from '../../infrastructure/guards/roles.guard';
import { PlaceService } from '../services/place.service';

@ApiTags('Places')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('/places')
export class PlaceController {
  constructor(private readonly placeService: PlaceService) {}

  @ApiBody({ type: RegisterPlaceDTO })
  @Post()
  @HasRoles(Role.COMMUNITY)
  async registerPlace(
    @Body(ValidationPipe) newPlace: RegisterPlaceDTO,
  ): Promise<Place> {
    return this.placeService.registerPlace(newPlace);
  }

  @ApiParam({
    name: 'communityId',
    description: 'ID necessary for getting all community places',
    required: true,
    type: String,
  })
  @Get('/community/:communityId')
  @HasRoles(Role.USER, Role.COMMUNITY)
  async getPlacesFromCommunity(
    @Param('communityId') communityId: string,
  ): Promise<Place[]> {
    return await this.placeService.getPlacesFromCommunity(communityId);
  }

  @ApiParam({
    name: 'id',
    description: 'ID necessary for getting a place',
    required: true,
    type: String,
  })
  @Get('/:id')
  @HasRoles(Role.USER, Role.COMMUNITY)
  async getPlaceById(@Param('id') id: string): Promise<Place> {
    return await this.placeService.getPlaceById(id);
  }

  @ApiParam({
    name: 'id',
    description: 'ID necessary for getting a place',
    required: true,
    type: String,
  })
  @Patch('/:id')
  @HasRoles(Role.USER, Role.COMMUNITY)
  async updatePlace(
    @Param('id') id: string,
    @Body(ValidationPipe) updatedPlace: UpdatePlaceDTO,
  ): Promise<Place> {
    return await this.placeService.updatePlace(id, updatedPlace);
  }
}
