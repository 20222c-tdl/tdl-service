import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import User from 'src/app/domain/entities/users/user.entity';
import { LoginUserDTO } from 'src/app/infrastructure/dtos/users/user-login.dto';
import { RegisterUserDTO } from 'src/app/infrastructure/dtos/users/user-register.dto';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  public getStatus(): string {
    return 'User Service is running!';
  }

  public async registerUser(newUser: RegisterUserDTO): Promise<User> {
    if (await this.isRegistered(newUser.email)) {
      throw new BadRequestException('This email is already in use!');
    }

    return await this.userRepository.save(new User(newUser));
  }

  public async loginUser(userCredentials: LoginUserDTO): Promise<User> {
    const { email, password } = userCredentials;

    const user = await this.userRepository
      .createQueryBuilder('user')
      .where('user.email = :email', { email })
      .getOne();

    if (user && bcrypt.compareSync(password, user.password)) {
      return user;
    }

    throw new BadRequestException('Wrong credentials!');
  }

  private async isRegistered(email: string) {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .where('user.email = :email', { email })
      .getOne();

    return !!user;
  }
}
