import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import User from 'src/app/domain/entities/users/user.entity';
import { LoginDTO } from 'src/app/infrastructure/dtos/common/login.dto';
import { RegisterUserDTO } from 'src/app/infrastructure/dtos/users/user-register.dto';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { CommunitiesService } from './community.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly communitiesService: CommunitiesService,
  ) {}

  public getStatus(): string {
    return 'User Service is running!';
  }

  public async registerUser(newUser: RegisterUserDTO): Promise<User> {
    if (await this.isRegistered(newUser.email)) {
      throw new BadRequestException('This email is already in use!');
    }

    if (!(await this.communitiesService.existsCommunity(newUser.communityId))) {
      throw new BadRequestException('This community does not exist!');
    }

    return await this.userRepository.save(new User(newUser));
  }

  public async loginUser(userCredentials: LoginDTO): Promise<User> {
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

  public async existsUser(id: string) {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .where('user.id = :id', { id })
      .getOne();
      
    return !!user;
  }

  public async getUserById(id: string): Promise<User> {
    return await this.userRepository.findOne({ where: { id } });
  }
}
