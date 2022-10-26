import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';
import { ApiTags, ApiBody } from '@nestjs/swagger';
import { IUser } from 'src/app/domain/interfaces/user.interface';
import { LoginUserDTO } from 'src/app/infrastructure/dtos/users/user-login.dto';
import { RegisterUserDTO } from 'src/app/infrastructure/dtos/users/user-register.dto';
import { UsersService } from '../services/users.service';

@Controller('/users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @ApiTags('users')
  @Get()
  getStatus(): string {
    return this.userService.getStatus();
  }

  @ApiTags('users')
  @ApiBody({type: RegisterUserDTO})
  @Post()
  async registerUser(@Body(ValidationPipe) newUser: RegisterUserDTO): Promise<IUser> {
    return this.userService.registerUser(newUser);
  }

  @ApiTags('users')
  @ApiBody({type: LoginUserDTO})
  @Post('/user/login')
  async loginUser(@Body(ValidationPipe) userCredentials: LoginUserDTO): Promise<IUser> {
    return this.userService.loginUser(userCredentials);
  }
}
