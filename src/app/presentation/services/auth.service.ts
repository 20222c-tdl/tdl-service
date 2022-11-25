import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import User from '../../domain/entities/users/user.entity';
import { CommunitiesService } from './community.service';
import { ProviderService } from './provider.service';
import { UsersService } from './users.service';


@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private providersService: ProviderService,
    private communitiesService: CommunitiesService,
    private jwtService: JwtService,
  ) {}

  public async login(user: any) {
    return this.getToken(user)
  }

  public async validateUser(email: string, password: string): Promise<Partial<User> | null> {
    const user = await this.usersService.findUser(email);

    if (user && bcrypt.compareSync(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

  public async validateProvider(email: string, password: string) {
    const provider = await this.providersService.findProvider(email);

    if (provider && bcrypt.compareSync(password, provider.password)) {
      const { password, ...result } = provider;
      return result;
    }

    return null;
  }

  public async validateCommunity(email: string, password: string) {
    const community = await this.communitiesService.findCommunity(email);

    if (community && bcrypt.compareSync(password, community.password)) {
      const { password, ...result } = community;
      return result;
    }

    return null;
  }

  private getToken(user: any) {
    const payload = {
      user,
      sub: user.id,
      role: user.role,
    };

    return {
      bearer: this.jwtService.sign(payload),
    };
  }
}
