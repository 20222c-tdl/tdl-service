import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { LoginDTO } from '../../infrastructure/dtos/common/login.dto';
import { RegisterUserDTO } from '../../infrastructure/dtos/users/user-register.dto';
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
  async registerUser(
    @Body(ValidationPipe) newUser: RegisterUserDTO,
  ): Promise<User> {
    return this.userService.registerUser(newUser);
  }

  @ApiTags('users')
  @ApiBody({ type: LoginDTO })
  @Post('/user/login')
  async loginUser(
    @Body(ValidationPipe) userCredentials: LoginDTO,
  ): Promise<User> {
    return this.userService.loginUser(userCredentials);
  }
}
