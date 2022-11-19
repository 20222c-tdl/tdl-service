import { Injectable } from '@nestjs/common';
import { UsersService } from '../app/presentation/services/users.service';
import { LoginDTO } from '../app/infrastructure/dtos/common/login.dto';
import User from '../app/domain/entities/users/user.entity';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';


@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  public async validateUser(username: string, password: string): Promise<User | null> {
    const user = await this.usersService.findUser(username);

    if (user && bcrypt.compareSync(password, user.password)) {
      return user;
    }
    return null;
  }

  public async login(credentials: LoginDTO) {
    const { email } = credentials;
    const { password, ...user } = await this.usersService.findUser(email);

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
