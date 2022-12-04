import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CreditCardController } from '../../presentation/controllers/credit-card.controller';
import { CreditCardService } from '../../presentation/services/credit-card.service';
import CreditCard from '../entities/credit-card/credit-card.entity';
import { UsersModule } from './user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([CreditCard]),
    UsersModule,
  ],
  controllers: [CreditCardController],
  providers: [CreditCardService],
  exports: [CreditCardService],
})
export class CreditCardModule {}
