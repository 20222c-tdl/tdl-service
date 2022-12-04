import { Body, Controller, Param, Patch, Post, ValidationPipe } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';

import { Role } from '../../domain/entities/roles/role.enum';
import User from '../../domain/entities/users/user.entity';
import { HasRoles } from '../../infrastructure/decorators/has-roles.decorator';
import { LoginDTO } from '../../infrastructure/dtos/common/login.dto';
import { RegisterUserDTO } from '../../infrastructure/dtos/users/user-register.dto';
import { UpdateUserPasswordDTO } from '../../infrastructure/dtos/users/user-update-password.dto';
import { UpdateUserDTO } from '../../infrastructure/dtos/users/user-update.dto';
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

  @HasRoles(Role.USER)
  @ApiBody({ type: UpdateUserPasswordDTO })
  @ApiParam({
    name: 'id',
    description: 'ID necessary for updating user password',
    required: true,
    type: String,
  })
  @Patch('/password/:id')
  async updateUserPassword(
    @Param('id') id: string,
    @Body(ValidationPipe) updatedUserPassword: UpdateUserPasswordDTO,
  ): Promise<User> {
    return this.userService.updateUserPassword(id, updatedUserPassword);
  }

  @HasRoles(Role.USER)
  @ApiBody({ type: UpdateUserDTO })
  @ApiParam({
    name: 'id',
    description: 'ID necessary for updating user',
    required: true,
    type: String,
  })
  @Patch(':id')
  async updateUser(
    @Param('id') id: string,
    @Body(ValidationPipe) updatedUser: UpdateUserDTO,
  ): Promise<User> {
    return this.userService.updateUser(id, updatedUser);
  }

}
