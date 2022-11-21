import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
} from '@nestjs/common';
import { ProviderService } from '../services/provider.service';
import { CreateProviderDto } from '../../infrastructure/dtos/provider/create-provider.dto';
import { ApiBody, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ProviderOptionsDto } from '../../infrastructure/dtos/provider/provider-options.dto';
import { Provider } from '../../domain/entities/provider/provider.entity';
import { PageDto } from '../../infrastructure/dtos/common/pagination/page.dto';
import { ApiPaginatedResponse } from '../../infrastructure/decorators/api-paginated-response.decorator';
import { LoginDTO } from '../../infrastructure/dtos/common/login.dto';

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
}
