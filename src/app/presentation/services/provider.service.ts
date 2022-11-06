import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProviderDto } from '../../infrastructure/dtos/provider/create-provider.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Provider } from '../../domain/entities/provider/provider.entity';
import { ProviderOptionsDto } from '../../infrastructure/dtos/provider/provider-options.dto';

@Injectable()
export class ProviderService {
  constructor(
    @InjectRepository(Provider)
    private providerRepository: Repository<Provider>,
  ) {}

  async create(createProviderDto: CreateProviderDto) {
    if (await this.isProviderRegistered(createProviderDto)) {
      throw new BadRequestException('This email is already in use!');
    }

    return this.providerRepository.save(new Provider(createProviderDto));
  }

  getProviders(providerOptionsDto: ProviderOptionsDto) {
    const queryBuilder = this.providerRepository.createQueryBuilder('provider');

    if (providerOptionsDto.categoryId) {
      queryBuilder.where('provider.categoryId = :categoryId', {
        categoryId: providerOptionsDto.categoryId,
      });
    }

    return queryBuilder.getMany();
  }

  private async isProviderRegistered(createProviderDto: CreateProviderDto) {
    const provider = await this.providerRepository.findOneBy({
      email: createProviderDto.email,
    });

    return provider !== null;
  }

  /*findOne(id: number) {
    return `This action returns a #${id} provider`;
  }*/
}
