import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import CreditCard from '../../domain/entities/credit-card/credit-card.entity';
import { RegisterCreditCardDTO } from '../../infrastructure/dtos/credit-card/credit-card-register.dto';
import { UsersService } from './users.service';

@Injectable()
export class CreditCardService {
  constructor(
    @InjectRepository(CreditCard)
    private creditCardRepository: Repository<CreditCard>,
    private readonly userService: UsersService,
  ) {}

  public async registerCreditCard(
    newCreditCard: RegisterCreditCardDTO,
  ): Promise<CreditCard> {
    if (await this.existsCreditCardWithNumber(newCreditCard.number))
      throw new BadRequestException('The credit card already exists!');

    if (!(await this.userService.existsUser(newCreditCard.userId)))
      throw new BadRequestException('The user does not exist!');

    return this.creditCardRepository.save(new CreditCard(newCreditCard));
  }

  public async getCreditCardsFromUser(userId: string) {
    return await this.creditCardRepository
      .createQueryBuilder('creditCard')
      .where('creditCard.userId = :userId', { userId })
      .getMany();
  }

  public async deleteCreditCard(id: string) {
    if (!(await this.existsCreditCard(id)))
      throw new BadRequestException('The credit card does not exist!');

    return await this.creditCardRepository.delete(id);
  }

  private async existsCreditCardWithNumber(creditCardNumber: string) {
    return !!(await this.creditCardRepository.findOne({
      where: { number: creditCardNumber },
    }));
  }

  private async existsCreditCard(id: string) {
    return !!(await this.creditCardRepository.findOne({ where: { id } }));
  }
}
