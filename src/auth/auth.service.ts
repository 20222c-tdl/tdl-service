import { Injectable } from '@nestjs/common';
import { UsersService } from '../app/presentation/services/users.service';
import { LoginDTO } from '../app/infrastructure/dtos/common/login.dto';
import User from '../app/domain/entities/users/user.entity';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { ProviderService } from '../app/presentation/services/provider.service';
import { Provider } from '../app/domain/entities/provider/provider.entity';
import { CommunitiesService } from '../app/presentation/services/community.service';


@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private providersService: ProviderService,
    private communitiesService: CommunitiesService,
    private jwtService: JwtService,
  ) {}

  public async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.usersService.findUser(email);
    if (user && bcrypt.compareSync(password, user.password)) {
      return user;
    }
    return null;
  }

  public async loginUser(credentials: LoginDTO) {
    const { email } = credentials;
    const { password, ...user } = await this.usersService.findUser(email);

    return this.getToken(email, user)
  }

  async validateProvider(email: string, password: string) {
    const user = await this.providersService.findProvider(email);
    if (user && bcrypt.compareSync(password, user.password)) {
      return user;
    }
    return null;
  }

  public async loginProvider(credentials: LoginDTO) {
    const { email } = credentials;
    const { password, ...user } = await this.providersService.findProvider(email);

    return this.getToken(email, user);
  }

  public async validateCommunity(email: string, password: string) {
    const community = await this.communitiesService.findCommunity(email);
    if (community && bcrypt.compareSync(password, community.password)) {
      return community;
    }
    return null;
  }

  public async loginCommunity(credentials: LoginDTO) {
    const { email } = credentials;
    const { password, ...user } = await this.communitiesService.findCommunity(email);

    return this.getToken(email, user);
  }

  private getToken(email: string, user: Partial<Provider | User>) {
    const payload = {
      email,
      sub: user.id,
    };

    return {
      ...user,
      access_token: this.jwtService.sign(payload),
    };
  }
}
