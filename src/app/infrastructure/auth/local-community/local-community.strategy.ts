import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../../../presentation/services/auth.service';

@Injectable()
export class LocalCommunityStrategy extends PassportStrategy(Strategy, 'community') {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'email',
    });
  }

  async validate(username: string, password: string): Promise<any> {
    const community = await this.authService.validateCommunity(username, password);

    if (!community) {
      throw new UnauthorizedException();
    }
    return community;
  }
}
