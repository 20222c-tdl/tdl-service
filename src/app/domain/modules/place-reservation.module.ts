import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlaceReservationController } from 'src/app/presentation/controllers/place-reservation.controller';
import { PlaceReservationService } from 'src/app/presentation/services/place-reservation.service';

import PlaceReservation from '../entities/place-reservation/place-reservation.entity';
import { CommunitiesModule } from './community.module';
import { UsersModule } from './user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([PlaceReservation]),
    UsersModule,
    CommunitiesModule,
  ],
  controllers: [PlaceReservationController],
  providers: [PlaceReservationService],
  exports: [PlaceReservationService],
})
export class PlaceReservationModule {}
