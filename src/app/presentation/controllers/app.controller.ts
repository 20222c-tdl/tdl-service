import { Body, Controller, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthService } from '../../../auth/auth.service';
import { LocalAuthGuard } from '../../../auth/local-auth.guard';
import { LoginDTO } from '../../infrastructure/dtos/common/login.dto';
import { ApiBody } from '@nestjs/swagger';
import { LocalProviderAuthGuard } from '../../../auth/local-provider-auth.guard';
import { LocalCommunityAuthGuard } from '../../../auth/local-community-auth.guard';

@Controller('auth')
export class AppController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @ApiBody({ type: LoginDTO })
  @Post('users/login')
  async userLogin(@Body(ValidationPipe) credentials: LoginDTO) {
    return this.authService.loginUser(credentials);
  }

  @UseGuards(LocalProviderAuthGuard)
  @ApiBody({ type: LoginDTO })
  @Post('providers/login')
  async providerLogin(@Body(ValidationPipe) credentials: LoginDTO) {
    return this.authService.loginProvider(credentials);
  }

  @UseGuards(LocalCommunityAuthGuard)
  @ApiBody({ type: LoginDTO })
  @Post('communities/login')
  async communityLogin(@Body(ValidationPipe) credentials: LoginDTO) {
    return this.authService.loginCommunity(credentials);
  }
}
