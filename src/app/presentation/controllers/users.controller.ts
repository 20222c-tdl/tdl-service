import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  UseInterceptors,
  ValidationPipe
} from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { LoginUserDTO } from 'src/app/infrastructure/dtos/users/user-login.dto';
import { RegisterUserDTO } from 'src/app/infrastructure/dtos/users/user-register.dto';
import { UsersService } from '../services/users.service';
import User from '../../domain/entities/users/user.entity';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('/users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @ApiTags('users')
  @Get()
  getStatus(): string {
    return this.userService.getStatus();
  }

  @ApiTags('users')
  @ApiBody({ type: RegisterUserDTO })
  @Post()
  async registerUser(@Body(ValidationPipe) newUser: RegisterUserDTO): Promise<User> {
    return this.userService.registerUser(newUser);
  }

  @ApiTags('users')
  @ApiBody({ type: LoginUserDTO })
  @Post('/user/login')
  async loginUser(@Body(ValidationPipe) userCredentials: LoginUserDTO): Promise<User> {
    return this.userService.loginUser(userCredentials);
  }
}
