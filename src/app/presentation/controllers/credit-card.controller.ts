import { Body, Controller, Delete, Get, Param, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';

import CreditCard from '../../domain/entities/credit-card/credit-card.entity';
import { Role } from '../../domain/entities/roles/role.enum';
import { JwtAuthGuard } from '../../infrastructure/auth/jwt/jwt-auth.guard';
import { HasRoles } from '../../infrastructure/decorators/has-roles.decorator';
import { RegisterCreditCardDTO } from '../../infrastructure/dtos/credit-card/credit-card-register.dto';
import { RolesGuard } from '../../infrastructure/guards/roles.guard';
import { CreditCardService } from '../services/credit-card.service';

  
  
    @ApiTags('Credit Card')
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Controller('/credit-card')
    export class CreditCardController {
      constructor(private readonly creditCardService: CreditCardService) {}
  
      @ApiBody({ type: RegisterCreditCardDTO })
      @Post()
      @HasRoles(Role.USER)
      async registerCreditCard(
        @Body(ValidationPipe) newCreditCard: RegisterCreditCardDTO,
      ): Promise<CreditCard> {
        return this.creditCardService.registerCreditCard(newCreditCard);
      }
      
      @ApiParam({
        name: 'userId',
        description: 'ID necessary for getting all user credit cards',
        required: true,
        type: String,
      })
      @HasRoles(Role.USER)
      @Get('/user/:userId')
      async getCreditCardsFromUser(
          @Param('userId') userId: string) {
        return await this.creditCardService.getCreditCardsFromUser(userId);
      }
  
      @ApiParam({
        name: 'id',
        description: 'ID necessary for deleting credit card',
        required: true,
        type: String,
      })
      @HasRoles(Role.USER)
      @Delete('/:id')
      async deleteCreditCard(
          @Param('id') id: string) {
        return await this.creditCardService.deleteCreditCard(id);
      }
    
    }