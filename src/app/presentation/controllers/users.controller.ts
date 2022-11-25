import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

import User from '../../domain/entities/users/user.entity';
import { LoginDTO } from '../../infrastructure/dtos/common/login.dto';
import { RegisterUserDTO } from '../../infrastructure/dtos/users/user-register.dto';
import { UsersService } from '../services/users.service';

@ApiTags('Users')
@Controller('/users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @ApiBody({ type: RegisterUserDTO })
  @Post()
  async registerUser(
    @Body(ValidationPipe) newUser: RegisterUserDTO,
  ): Promise<User> {
    return this.userService.registerUser(newUser);
  }

  @ApiBody({ type: LoginDTO })
  @ApiOperation({ deprecated: true })
  @Post('/user/login')
  async loginUser(
    @Body(ValidationPipe) userCredentials: LoginDTO,
  ): Promise<User> {
    return this.userService.loginUser(userCredentials);
  }
}
