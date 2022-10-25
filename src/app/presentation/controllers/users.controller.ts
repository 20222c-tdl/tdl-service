import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UsersService } from '../services/usesr.service';

@Controller('/users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @ApiTags('users')
  @Get()
  getStatus(): string {
    return this.userService.getStatus();
  }
}
