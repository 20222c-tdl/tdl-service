import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProviderDto } from '../../infrastructure/dtos/provider/create-provider.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Provider } from '../../domain/entities/provider/provider.entity';
import { PageDto } from '../../infrastructure/dtos/common/pagination/page.dto';
import { PageMetaDto } from '../../infrastructure/dtos/common/pagination/page-meta.dto';
import { ProviderOptionsDto } from '../../infrastructure/dtos/provider/provider-options.dto';
import * as bcrypt from 'bcrypt';
import { LoginDTO } from '../../infrastructure/dtos/common/login.dto';
import { ReviewService } from './review.service';

@Injectable()
export class ProviderService {
  constructor(
    @InjectRepository(Provider)
    private providerRepository: Repository<Provider>,
    private readonly reviewService: ReviewService,
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
    const providers = await (await queryBuilder.getRawAndEntities()).entities;

    const providersWithRating = []
    for (const provider of providers) {
      const rating = await this.reviewService.getReviewsFromProvider(provider.id)
      providersWithRating.push({provider: provider, totalRating: rating.totalRating, reviewCount: rating.reviews.length})

    }

    const pageMetaDto = new PageMetaDto(providerOptionsDto, itemCount);

    return new PageDto(providersWithRating, pageMetaDto);
  }

  private async isProviderRegistered(createProviderDto: CreateProviderDto) {
    const { email } = createProviderDto;

    const provider = await this.providerRepository
      .createQueryBuilder('provider')
      .where('provider.email = :email', { email })
      .getOne();

    return provider !== null;
  }

  async existsProvider(id: string) {
    const provider = await this.providerRepository
      .createQueryBuilder('provider')
      .where('provider.id = :id', { id })
      .getOne();

    return provider !== null;
  }

  /**
   * @deprecated
   */
  public async login(providerCredentials: LoginDTO): Promise<Provider> {
    const { email, password } = providerCredentials;

    const user = await this.providerRepository
      .createQueryBuilder('provider')
      .where('provider.email = :email', { email })
      .getOne();

    if (user && bcrypt.compareSync(password, user.password)) {
      return user;
    }

    throw new BadRequestException('Wrong credentials!');
  }

  public findProvider(email: string): Promise<Provider> {
    return this.providerRepository
      .createQueryBuilder('provider')
      .where('provider.email = :email', { email })
      .getOne();
  }

  public async getProvider(id: string): Promise<Provider> {
    return this.providerRepository
      .createQueryBuilder('provider')
      .leftJoinAndSelect('provider.category', 'category')
      .where('provider.id = :id', { id })
      .getOne();
  }
}
