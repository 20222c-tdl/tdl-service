import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import User from 'src/app/domain/entities/users/user.entity';
import { IUser } from 'src/app/domain/interfaces/user.interface';
import { LoginUserDTO } from 'src/app/infrastructure/dtos/users/user-login.dto';
import { RegisterUserDTO } from 'src/app/infrastructure/dtos/users/user-register.dto';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  getStatus(): string {
    return 'User Service is running!';
  }

  async registerUser(newUser: RegisterUserDTO): Promise<IUser> {
    if (await this.isRegistered(newUser.email)) {
      throw new BadRequestException('This email is already in use!');
    }

    const userAdded: IUser = {...await this.userRepository.save(newUser)}
    return userAdded;
  }

  async isRegistered(email: string) {
    let user = await this.userRepository.createQueryBuilder('user').where('user.email = :email', { email }).getOne();
    return user ? true : false;
  }

  async loginUser(userCredentials: LoginUserDTO): Promise<IUser> {

    let user = await this.userRepository.createQueryBuilder('user')
      .where(`user.email = '${ userCredentials.email }'`)
      .andWhere(`user.password = '${ userCredentials.password }'`).getOne();
    if (!user) {
      throw new BadRequestException('Wrong credentials!');
    }
    
    return this.userInformation(user);
  }

  userInformation(user: User): IUser {
    const userInformation: IUser = { id: user.id, firstName: user.firstName, lastName: user.lastName, email: user.email, address: user.address, phoneNumber: user.phoneNumber, communityId: user.communityId };
    return userInformation;
  }
}
