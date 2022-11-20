import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from '../../../auth/auth.service';
import { LocalAuthGuard } from '../../../auth/local-auth.guard';
import { LoginDTO } from '../../infrastructure/dtos/common/login.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { LocalProviderAuthGuard } from '../../../auth/local-provider-auth.guard';
import { LocalCommunityAuthGuard } from '../../../auth/local-community-auth.guard';

@ApiTags('auth')
@Controller('auth')
export class AppController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
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
}
