import { Module } from '@nestjs/common';
import { UsersModule } from '../../domain/modules/user.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as ormconfig from '../../../ormconfig';
import { CommunitiesModule } from '../../domain/modules/community.module';
import { ClaimsModule } from '../../domain/modules/claim.module';
import { ProviderModule } from '../../domain/modules/provider.module';
import { ServicesModule } from 'src/app/domain/modules/services.module';
import { ReviewModule } from 'src/app/domain/modules/review.module';
import { AuthModule } from './auth.module';
import { HiredServicesModule } from 'src/app/domain/modules/hired-services.module';


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
