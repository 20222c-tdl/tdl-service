import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Claim from 'src/app/domain/entities/claims/claim.entity';
import { Repository } from 'typeorm';

import ClaimComment from '../../domain/entities/claims-comment/claim-comment.entity';
import { Role } from '../../domain/entities/roles/role.enum';
import { RegisterClaimCommentDTO } from '../../infrastructure/dtos/claim-comment/claim-comment-register.dto';
import { ClaimsService } from './claims.service';


@Injectable()
export class ClaimCommentService {
  constructor(
    @InjectRepository(ClaimComment)
    private claimCommentRepository: Repository<ClaimComment>,
    @InjectRepository(ClaimComment)
    private claimRepository: Repository<Claim>,
  ) {}

  public async registerClaimComment(newClaimComment: RegisterClaimCommentDTO): Promise<ClaimComment> {
    await this.validateNewClaimComment(newClaimComment);
    return this.claimCommentRepository.save(newClaimComment);
  }


  private async validateNewClaimComment(newClaimComment: RegisterClaimCommentDTO) {

    if (newClaimComment.role == Role.COMMUNITY && !(await this.existCommunityWithClaim(newClaimComment.entityId, newClaimComment.claimId))) 
      throw new BadRequestException('The Claim does not exist in this Community!')
    else if (newClaimComment.role == Role.USER && !(await this.existUserWithClaim(newClaimComment.entityId, newClaimComment.claimId)))
      throw new BadRequestException('The Claim was not made by this User!')
  }

  public async getClaimComments(id: any) {
    return await this.claimCommentRepository.find({ where: { claimId: id }, order: { date: 'ASC' } });
  }

  private async existUserWithClaim(entityId: string, claimId: string) {
    return !!(await this.claimRepository.findOne({ where: { id: claimId, userId: entityId } }));
  }
  private async existCommunityWithClaim(entityId: string, claimId: string) {
    return !!(await this.claimRepository.findOne({ where: { id: claimId, communityId: entityId } }));
  }
}