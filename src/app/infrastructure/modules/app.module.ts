import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HiredServicesModule } from 'src/app/domain/modules/hired-services.module';
import { ReviewModule } from 'src/app/domain/modules/review.module';
import { ServicesModule } from 'src/app/domain/modules/services.module';

import * as ormconfig from '../../../ormconfig';
import { ClaimsModule } from '../../domain/modules/claim.module';
import { CommunitiesModule } from '../../domain/modules/community.module';
import { ProviderModule } from '../../domain/modules/provider.module';
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
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      ...ormconfig,
      autoLoadEntities: true,
    }),
  ],
  providers: [],
})
export class AppModule {}
