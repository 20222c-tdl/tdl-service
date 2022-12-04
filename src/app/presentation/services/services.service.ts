import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import Service from '../../domain/entities/service/service.entity';
import { RegisterServiceDTO } from '../../infrastructure/dtos/services/service-register.dto';
import { UpdateServiceDTO } from '../../infrastructure/dtos/services/service-update.dto';
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

  async existsService(id: string) {
    return !!(this.servicesRepository.find({ where: { id } }))
  }

  async getServiceById(id: string) {
    return this.servicesRepository.findOne({ where: { id } });
  }

  async updateService(id: string, updatedService: UpdateServiceDTO): Promise<Service> {
    if (!(await this.existsService(id))) {
      throw new BadRequestException('The service does not exist!');
    }
    this.servicesRepository
      .createQueryBuilder()
      .update(Service)
      .set(updatedService)
      .where('id = :id', { id })
      .execute();

    return this.servicesRepository.findOne({
      where: { id },
    });
  }

}
