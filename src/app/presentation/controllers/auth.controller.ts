import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { LocalUserAuthGuard } from '../../infrastructure/auth/local-user/local-user-auth.guard';
import { LoginDTO } from '../../infrastructure/dtos/common/login.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { LocalProviderAuthGuard } from '../../infrastructure/auth/local-provider/local-provider-auth.guard';
import { LocalCommunityAuthGuard } from '../../infrastructure/auth/local-community/local-community-auth.guard';
import { JwtAuthGuard } from '../../infrastructure/auth/jwt/jwt-auth.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalUserAuthGuard)
  @ApiBody({ type: LoginDTO })
  @Post('users/login')
  async userLogin(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(LocalProviderAuthGuard)
  @ApiBody({ type: LoginDTO })
  @Post('providers/login')
  async providerLogin(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(LocalCommunityAuthGuard)
  @ApiBody({ type: LoginDTO })
  @Post('communities/login')
  async communityLogin(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
