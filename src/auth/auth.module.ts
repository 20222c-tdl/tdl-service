import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../app/domain/modules/user.module';
import { LocalStrategy } from './local.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { ProviderModule } from '../app/domain/modules/provider.module';
import { LocalProviderStrategy } from './local-provider.strategy';
import { CommunitiesModule } from '../app/domain/modules/community.module';
import { LocalCommunityStrategy } from './local-community.strategy';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    UsersModule,
    CommunitiesModule,
    ProviderModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: {
        expiresIn: '1d',
      },
    }),
  ],
  providers: [
    AuthService,
    LocalCommunityStrategy,
    LocalStrategy,
    LocalProviderStrategy,
    JwtStrategy,
  ],
  exports: [AuthService],
})
export class AuthModule {}
