import { Module } from '@nestjs/common';
import { AuthService } from '../../presentation/services/auth.service';
import { UsersModule } from '../../domain/modules/user.module';
import { LocalUserStrategy } from '../auth/local-user/local-user.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../auth/constants';
import { ProviderModule } from '../../domain/modules/provider.module';
import { LocalProviderStrategy } from '../auth/local-provider/local-provider.strategy';
import { CommunitiesModule } from '../../domain/modules/community.module';
import { LocalCommunityStrategy } from '../auth/local-community/local-community.strategy';
import { JwtStrategy } from '../auth/jwt/jwt.strategy';
import { AuthController } from '../../presentation/controllers/auth.controller';

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
    LocalUserStrategy,
    LocalProviderStrategy,
    JwtStrategy,
  ],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
