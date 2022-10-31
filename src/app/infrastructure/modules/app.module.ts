import { Module } from '@nestjs/common';
import { UsersModule } from 'src/app/domain/modules/user.module';
import { AppController } from 'src/app/presentation/controllers/app.controller';
import { AppService } from '../../presentation/services/app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as ormconfig from '../../../ormconfig';
import { CommunitiesModule } from 'src/app/domain/modules/community.module';

@Module({
  imports: [
    UsersModule,
    CommunitiesModule,
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
