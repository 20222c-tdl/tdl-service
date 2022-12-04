import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import * as ormconfig from '../../../ormconfig';
import { ClaimsModule } from '../../domain/modules/claim.module';
import { CommunitiesModule } from '../../domain/modules/community.module';
import { CreditCardModule } from '../../domain/modules/credit-card.module';
import { HiredServicesModule } from '../../domain/modules/hired-services.module';
import { PlaceReservationModule } from '../../domain/modules/place-reservation.module';
import { ProviderModule } from '../../domain/modules/provider.module';
import { ReviewModule } from '../../domain/modules/review.module';
import { ServicesModule } from '../../domain/modules/services.module';
import { UsersModule } from '../../domain/modules/user.module';
import { AuthModule } from './auth.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    CommunitiesModule,
    ClaimsModule,
    ProviderModule,
    ServicesModule,
    ReviewModule,
    HiredServicesModule,
    CreditCardModule,
    PlaceReservationModule,
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      ...ormconfig,
      autoLoadEntities: true,
    }),
  ],
  providers: [],
})
export class AppModule {}
