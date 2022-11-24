import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Service from 'src/app/domain/entities/service/service.entity';
import { RegisterServiceDTO } from 'src/app/infrastructure/dtos/services/service-register.dto';
import { ProviderService } from './provider.service';
import HiredProvider from 'src/app/domain/entities/hired-services/hired-provider.entity';
import HiredService from 'src/app/domain/entities/hired-services/hired-service.entity';
import { UsersService } from './users.service';
import { ServicesService } from './services.service';
import { RegisterHiredServicesDTO } from 'src/app/infrastructure/dtos/hired-services/hired-services-register.dto';
import { IHiredServices } from 'src/app/domain/interfaces/hired-services.interface';

@Injectable()
export class HiredServicesService {
  constructor(
    @InjectRepository(HiredProvider)
    private hiredProvidersRepository: Repository<HiredProvider>,
    @InjectRepository(HiredService)
    private hiredServicesRepository: Repository<HiredService>,
    private readonly providerService: ProviderService,
    private readonly userService: UsersService,
    private readonly servicesService: ServicesService,
  ) {}
  
  public async registerHiredService(newHiredServices: RegisterHiredServicesDTO): Promise<IHiredServices> {
    await this.validateNewHiredServices(newHiredServices);

    const savedHiredProvider = await this.hiredProvidersRepository.save(new HiredProvider({...newHiredServices, isPaid: false}));
    for (const hiredService of newHiredServices.hiredServices) {
      await this.hiredServicesRepository.save(new HiredService({...hiredService, hiredProviderId: savedHiredProvider.id}));
    }
    
    return {...newHiredServices, id: savedHiredProvider.id};
  }
  


  private async validateNewHiredServices(newHiredServices: RegisterHiredServicesDTO) {
    if (!(await this.providerService.existsProvider(newHiredServices.providerId))) {
      throw new BadRequestException('The provider does not exist!');
    }
    if (!(await this.userService.existsUser(newHiredServices.userId))) {
      throw new BadRequestException('The user does not exist!');
    }

    await this.hiredServicesExists(newHiredServices);
  }

  private async hiredServicesExists(newHiredServices: RegisterHiredServicesDTO) {
    for (const hiredService of newHiredServices.hiredServices) {
      if (!(await this.servicesService.existsService(hiredService.serviceId)))
        throw new BadRequestException('The service does not exist!');
    }
  }

  public async getHiredServicesFromUser(userId: string){
    const userHiredServices = [];

    const userHiredProvider = await this.hiredProvidersRepository
      .createQueryBuilder('hiredProvider')
      .where('hiredProvider.userId = :userId', { userId })
      .getMany();
    console.log("🚀 ~ userHiredServices", await userHiredProvider)

    for (const hiredProvider of userHiredProvider) {
      const hiredServicesIds = await this.hiredServicesRepository.find({ where: { hiredProviderId: hiredProvider.id } });
      const hiredServices = [];
      for (const hiredServiceIds of hiredServicesIds)
        hiredServices.push(await this.servicesService.getServiceById(hiredServiceIds.serviceId));
      const provider = await this.providerService.getProvider(hiredProvider.providerId);
      userHiredServices.push({hiredServices: hiredProvider, services: hiredServices, provider: provider});
    }
    
    
    return userHiredServices;
  }
}
