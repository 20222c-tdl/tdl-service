import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ProviderService } from '../services/provider.service';
import { CreateProviderDto } from '../../infrastructure/dtos/provider/create-provider.dto';
import { ApiTags } from '@nestjs/swagger';
import { ProviderOptionsDto } from '../../infrastructure/dtos/provider/provider-options.dto';

@ApiTags('providers')
@Controller('providers')
export class ProviderController {
  constructor(private readonly providerService: ProviderService) {}

  @Post()
  create(@Body() createProviderDto: CreateProviderDto) {
    return this.providerService.create(createProviderDto);
  }

  @Get()
  find(@Query() providerOptionsDto: ProviderOptionsDto) {
    return this.providerService.getProviders(providerOptionsDto);
  }

  /*@Get(':id')
  findOne(@Param('id') id: string) {
    return this.providerService.findOne(+id);
  }*/
}
