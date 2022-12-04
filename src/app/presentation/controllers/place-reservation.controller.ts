import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';

import PlaceReservation from '../../domain/entities/place-reservation/place-reservation.entity';
import { Role } from '../../domain/entities/roles/role.enum';
import { JwtAuthGuard } from '../../infrastructure/auth/jwt/jwt-auth.guard';
import { HasRoles } from '../../infrastructure/decorators/has-roles.decorator';
import { RegisterPlaceReservationDTO } from '../../infrastructure/dtos/place-reservation/place-reservation-register.dto';
import { RolesGuard } from '../../infrastructure/guards/roles.guard';
import { PlaceReservationService } from '../services/place-reservation.service';

@ApiTags('Place Reservation')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('/place-reservation')
export class PlaceReservationController {
  constructor(
    private readonly placeReservationService: PlaceReservationService,
  ) {}

  @ApiBody({ type: RegisterPlaceReservationDTO })
  @Post()
  @HasRoles(Role.USER, Role.COMMUNITY)
  async registerPlaceReservation(
    @Body(ValidationPipe) newPlaceReservation: RegisterPlaceReservationDTO,
  ): Promise<PlaceReservation> {
    return this.placeReservationService.registerPlaceReservation(
      newPlaceReservation,
    );
  }

  @ApiParam({
    name: 'userId',
    description: 'ID necessary for getting all user place reservations',
    required: true,
    type: String,
  })
  @HasRoles(Role.USER)
  @Get('/user/:userId')
  async getPlaceReservationFromUser(@Param('userId') userId: string) {
    return await this.placeReservationService.getPlaceReservationFromUser(
      userId,
    );
  }
}
