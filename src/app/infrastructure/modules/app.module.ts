import { Module } from '@nestjs/common';
import { UsersModule } from '../../domain/modules/user.module';
import { AppController } from '../../presentation/controllers/app.controller';
import { AppService } from '../../presentation/services/app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as ormconfig from '../../../ormconfig';
import { CommunitiesModule } from '../../domain/modules/community.module';
import { ClaimsModule } from '../../domain/modules/claim.module';
import { ProviderModule } from '../../domain/modules/provider.module';
import { ServicesModule } from 'src/app/domain/modules/services.module';
import { ReviewModule } from 'src/app/domain/modules/review.module';

@Module({
  imports: [
    UsersModule,
    CommunitiesModule,
    ClaimsModule,
    ProviderModule,
    ServicesModule,
    ReviewModule,
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      ...ormconfig,
      autoLoadEntities: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
