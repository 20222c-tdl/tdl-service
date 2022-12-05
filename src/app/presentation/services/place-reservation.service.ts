import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, Repository } from 'typeorm';

import PlaceReservation from '../../domain/entities/place-reservation/place-reservation.entity';
import { RegisterPlaceReservationDTO } from '../../infrastructure/dtos/place-reservation/place-reservation-register.dto';
import { PlaceService } from './place.service';
import { UsersService } from './users.service';

@Injectable()
export class PlaceReservationService {
  constructor(
    @InjectRepository(PlaceReservation)
    private placeReservationRepository: Repository<PlaceReservation>,
    private readonly userService: UsersService,
    private readonly placeService: PlaceService,
  ) {}

  public async registerPlaceReservation(
    newPlaceReservation: RegisterPlaceReservationDTO,
  ): Promise<PlaceReservation> {
    if (!this.userService.existsUser(newPlaceReservation.userId))
      throw new BadRequestException('The user does not exist!');
    if (!this.placeService.existsPlace(newPlaceReservation.placeId))
      throw new BadRequestException('The place does not exist!');

    // TODO: Validate dates
    if (!(await this.validateDates(newPlaceReservation)))
      throw new BadRequestException('The dates are not valid!');

    return await this.placeReservationRepository.save(
      new PlaceReservation(newPlaceReservation),
    );
  }

  private async validateDates(placeReservation: RegisterPlaceReservationDTO) {
    if (placeReservation.startingDate > placeReservation.finishingDate)
      throw new BadRequestException(
        'The start date must be before the end date!',
      );

    const matchingReservations = await this.placeReservationRepository
      .createQueryBuilder('placeReservation')
      .where('placeReservation.placeId = :placeId', {
        placeId: placeReservation.placeId,
      })
      .andWhere(
        new Brackets((queryBuilder) => {
          queryBuilder
            .where(
              new Brackets((qb) => {
                qb.where('placeReservation.startingDate <= :startingDate', {
                  startingDate: placeReservation.startingDate,
                }).andWhere('placeReservation.finishingDate >= :startingDate', {
                  startingDate: placeReservation.startingDate,
                });
              }),
            )
            .orWhere(
              new Brackets((qb) => {
                qb.where('placeReservation.startingDate <= :finishingDate', {
                  finishingDate: placeReservation.finishingDate,
                }).andWhere('placeReservation.finishingDate >= :finishingDate', {
                  finishingDate: placeReservation.finishingDate,
                });
              }),
            )
            .orWhere(
              new Brackets((qb) => {
                qb.where('placeReservation.startingDate >= :startingDate', {
                  startingDate: placeReservation.startingDate,
                }).andWhere('placeReservation.finishingDate <= :finishingDate', {
                  finishingDate: placeReservation.finishingDate,
                });
              }),
            )
            .orWhere(
              new Brackets((qb) => {
                qb.where('placeReservation.startingDate <= :startingDate', {
                  startingDate: placeReservation.startingDate,
                }).andWhere('placeReservation.finishingDate >= :finishingDate', {
                  finishingDate: placeReservation.finishingDate,
                });
              }),
            );
        }),
      )
      .getMany();
    return matchingReservations.length === 0;
  }

  public async getPlaceReservationFromUser(userId: string) {
    if (!this.userService.existsUser(userId))
      throw new BadRequestException('The user does not exist!');

    return await this.placeReservationRepository
      .createQueryBuilder('placeReservation')
      .where('placeReservation.userId = :userId', { userId })
      .getMany();
  }
}
