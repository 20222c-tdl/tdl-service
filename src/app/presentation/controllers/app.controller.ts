import { Body, Controller, Get, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { AppService } from '../services/app.service';
import { AuthService } from '../../../auth/auth.service';
import { LocalAuthGuard } from '../../../auth/local-auth.guard';
import { LoginDTO } from '../../infrastructure/dtos/common/login.dto';
import { ApiBody } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
              private authService: AuthService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @UseGuards(LocalAuthGuard)
  @ApiBody({ type: LoginDTO })
  @Post('auth/login')
  async login(@Body(ValidationPipe) credentials: LoginDTO) {
    return this.authService.login(credentials);
  }
}
