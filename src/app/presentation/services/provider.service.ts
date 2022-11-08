import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProviderDto } from '../../infrastructure/dtos/provider/create-provider.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Provider } from '../../domain/entities/provider/provider.entity';
import { PageDto } from '../../infrastructure/dtos/common/page.dto';
import { PageMetaDto } from '../../infrastructure/dtos/common/page-meta.dto';
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

  async getProviders(
    providerOptionsDto: ProviderOptionsDto,
  ): Promise<PageDto<Provider>> {
    const queryBuilder = this.providerRepository
      .createQueryBuilder('provider')
      .leftJoinAndSelect('provider.category', 'category');

    queryBuilder.skip(providerOptionsDto.skip).take(providerOptionsDto.take);

    if (providerOptionsDto.categoryId) {
      queryBuilder.where('provider.categoryId = :categoryId', {
        categoryId: providerOptionsDto.categoryId,
      });
    }

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    const pageMetaDto = new PageMetaDto(providerOptionsDto, itemCount);

    return new PageDto(entities, pageMetaDto);
  }

  private async isProviderRegistered(createProviderDto: CreateProviderDto) {
    const { email } = createProviderDto;

    const provider = await this.providerRepository
      .createQueryBuilder('provider')
      .where('provider.email = :email', { email })
      .getOne();

    return provider !== null;
  }
}
