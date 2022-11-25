import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ClaimCommentController } from '../../presentation/controllers/claims-comment.controller';
import { ClaimsController } from '../../presentation/controllers/claims.controller';
import { ClaimCommentService } from '../../presentation/services/claim-comment.service';
import { ClaimsService } from '../../presentation/services/claims.service';
import ClaimComment from '../entities/claims-comment/claim-comment.entity';
import Claim from '../entities/claims/claim.entity';
import { CommunitiesModule } from './community.module';
import { UsersModule } from './user.module';


@Module({
  imports: [
    TypeOrmModule.forFeature([Claim]),
    TypeOrmModule.forFeature([ClaimComment]),
    CommunitiesModule,
    UsersModule],
  controllers: [ClaimsController, ClaimCommentController],
  providers: [ClaimsService, ClaimCommentService],
  exports: [ClaimsService],
})
export class ClaimsModule {}
