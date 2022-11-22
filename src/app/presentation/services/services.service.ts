import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Service from 'src/app/domain/entities/service/service.entity';
import { RegisterServiceDTO } from 'src/app/infrastructure/dtos/services/service-register.dto';
import { ProviderService } from './provider.service';

@Injectable()
export class ServicesService {
  constructor(
    @InjectRepository(Service)
    private servicesRepository: Repository<Service>,
    private readonly providerService: ProviderService,
  ) {}


  async registerService(newService: RegisterServiceDTO): Promise<Service> {
    if (await !this.providerService.existsProvider(newService.providerId)) {
      throw new BadRequestException('The provider does not exist!');
    }
    return this.servicesRepository.save(new Service(newService));
  }

  async getServicesFromProvider(providerId: string): Promise<Service[]> {
    if (await !this.providerService.existsProvider(providerId)) {
      throw new BadRequestException('The provider does not exist!');
    }
    return this.servicesRepository.find({ where: { providerId } });
  }

}
