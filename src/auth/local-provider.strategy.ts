import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalProviderStrategy extends PassportStrategy(Strategy, 'providers') {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'email',
    });
  }

  async validate(username: string, password: string): Promise<any> {
    const provider = await this.authService.validateProvider(username, password);

    if (!provider) {
      throw new UnauthorizedException();
    }
    return provider;
  }
}
