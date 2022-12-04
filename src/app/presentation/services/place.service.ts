import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import Place from '../../domain/entities/place/place.entity';
import { RegisterPlaceDTO } from '../../infrastructure/dtos/place/place-register.dto';
import { CommunitiesService } from './community.service';

@Injectable()
export class PlaceService {
  constructor(
    @InjectRepository(Place)
    private placeRepository: Repository<Place>,
    private readonly communityService: CommunitiesService,
  ) {}

  public async registerPlace(newPlace: RegisterPlaceDTO): Promise<Place> {
    if (!(await this.communityService.existsCommunity(newPlace.communityId))) {
      throw new Error('The community does not exist!');
    }

    return await this.placeRepository.save(new Place(newPlace));
  }

  public async getPlacesFromCommunity(communityId: string): Promise<Place[]> {
    if (!(await this.communityService.existsCommunity(communityId))) {
      throw new Error('The community does not exist!');
    }

    return await this.placeRepository.find({ where: { communityId } });
  }

  public async existsPlace(placeId: string): Promise<boolean> {
    return !! (await this.placeRepository.find({ where: { id: placeId } }));
  }

}
