import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Query } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';

import { Provider } from '../../domain/entities/provider/provider.entity';
import { ApiPaginatedResponse } from '../../infrastructure/decorators/api-paginated-response.decorator';
import { LoginDTO } from '../../infrastructure/dtos/common/login.dto';
import { PageDto } from '../../infrastructure/dtos/common/pagination/page.dto';
import { CreateProviderDto } from '../../infrastructure/dtos/provider/create-provider.dto';
import { ProviderOptionsDto } from '../../infrastructure/dtos/provider/provider-options.dto';
import { ProviderService } from '../services/provider.service';

@ApiTags('Providers')
@Controller('providers')
export class ProviderController {
  constructor(private readonly providerService: ProviderService) {}

  @Post()
  @ApiOkResponse({ type: Provider })
  create(@Body() createProviderDto: CreateProviderDto) {
    return this.providerService.create(createProviderDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiPaginatedResponse(Provider)
  find(
    @Query() providerOptionsDto: ProviderOptionsDto,
  ): Promise<PageDto<Provider>> {
    return this.providerService.getProviders(providerOptionsDto);
  }

  @ApiBody({ type: LoginDTO })
  @ApiOperation({ deprecated: true })
  @Post('/login')
  async login(@Body() providerCredentials: LoginDTO): Promise<Provider> {
    return this.providerService.login(providerCredentials);
  }

  @ApiParam({
    name: 'providerId',
    description: 'ID necessary for getting the provider information',
    required: true,
    type: String,
  })
  @Get('/:providerId')
  async getProvider(
      @Param('providerId') providerId: string): Promise<Provider> {
    return await this.providerService.getProvider(providerId);
  }
}
