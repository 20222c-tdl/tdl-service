import { Module } from '@nestjs/common';
import { UsersModule } from '../../domain/modules/user.module';
import { AppController } from '../../presentation/controllers/app.controller';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as ormconfig from '../../../ormconfig';
import { CommunitiesModule } from '../../domain/modules/community.module';
import { ClaimsModule } from '../../domain/modules/claim.module';
import { ProviderModule } from '../../domain/modules/provider.module';
import { AuthModule } from '../../../auth/auth.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    CommunitiesModule,
    ClaimsModule,
    ProviderModule,
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      ...ormconfig,
      autoLoadEntities: true,
    }),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
