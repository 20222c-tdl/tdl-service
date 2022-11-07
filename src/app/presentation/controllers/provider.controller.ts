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
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ProviderOptionsDto } from '../../infrastructure/dtos/provider/provider-options.dto';
import { Provider } from '../../domain/entities/provider/provider.entity';
import { PageDto } from '../../infrastructure/dtos/common/page.dto';
import { ApiPaginatedResponse } from '../../infrastructure/decorators/api-paginated-response.decorator';

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
}
