import { Body, Controller, Get, Post } from '@nestjs/common';
import { ProviderService } from '../services/provider.service';
import { CreateProviderDto } from '../../infrastructure/dtos/provider/create-provider.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('providers')
@Controller('providers')
export class ProviderController {
  constructor(private readonly providerService: ProviderService) {}

  @Post()
  create(@Body() createProviderDto: CreateProviderDto) {
    return this.providerService.create(createProviderDto);
  }

  @Get()
  findAll() {
    return this.providerService.findAll();
  }

  /*@Get(':id')
  findOne(@Param('id') id: string) {
    return this.providerService.findOne(+id);
  }*/
}
