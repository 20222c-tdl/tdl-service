import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import ClaimComment from 'src/app/domain/entities/claims-comment/claim-comment.entity';
import { Repository } from 'typeorm';

import Claim from '../../domain/entities/claims/claim.entity';
import { ClaimStatus } from '../../domain/entities/claims/claim.entity.status';
import User from '../../domain/entities/users/user.entity';
import { RegisterClaimDTO } from '../../infrastructure/dtos/claims/claim-register.dto';
import { UpdateClaimDTO } from '../../infrastructure/dtos/claims/claim-update.dto';
import { ClaimsByCommunityDTO } from '../../infrastructure/dtos/claims/claims-by-community.dto';
import { ClaimsByUserDTO } from '../../infrastructure/dtos/claims/claims-by-user.dto';
import { ClaimCommentService } from './claim-comment.service';
import { CommunitiesService } from './community.service';
import { UsersService } from './users.service';


@Injectable()
export class ClaimsService {
  constructor(
    @InjectRepository(Claim)
    private claimRepository: Repository<Claim>,
    private readonly communitiesService: CommunitiesService,
    private readonly usersService: UsersService,
    private readonly claimCommentService: ClaimCommentService,
  ) {}

  public async registerClaim(newClaim: RegisterClaimDTO): Promise<Claim> {

    if (!(await this.communitiesService.existsCommunity(newClaim.communityId))) {
      throw new BadRequestException('This community does not exist!');
    }

    if (!(await this.usersService.existsUser(newClaim.userId))) {
      throw new BadRequestException('This user does not exist!');
    }

    return await this.claimRepository.save(new Claim({ ...newClaim, status: ClaimStatus.OPEN }));
  }


  public async getClaimsByCommunity(claimsByCommunityDTO: ClaimsByCommunityDTO): Promise<{ claim: Claim; user: User; claimComments: ClaimComment[] }[]> {
    const { communityId } = claimsByCommunityDTO;


    if (!(await this.communitiesService.existsCommunity(communityId))) {
      throw new BadRequestException('This community does not exist!');
    }

    const claims = await this.claimRepository
      .createQueryBuilder('claim')
      .where('claim.communityId = :communityId', { communityId })
      .getMany();

    let claimsWithUser = [];
    for (const claim of claims) {
      const user = (await this.usersService.getUserById(claim.userId));
      claimsWithUser.push({ ...claim, user });
    }

    return await this.attachCommentsToClaims(claimsWithUser);
  }

  public async updateClaimStatus(id: string, status: ClaimStatus): Promise<Claim> {
    await this.claimRepository.createQueryBuilder().update(Claim).set({ status }).where('id = :id', { id }).execute();

    return this.claimRepository.findOne({ where: { id } });
  }

  public async getClaimsByUser(claimsByUserDto: ClaimsByUserDTO): Promise<{ claim: Claim; user: User; claimComments: ClaimComment[] }[]> {
    if (!(await this.usersService.existsUser(claimsByUserDto.userId))) {
      throw new BadRequestException('This user does not exist!');
    }

    const userClaims = await this.claimRepository.find({ where: { userId: claimsByUserDto.userId } })
    const user = (await this.usersService.getUserById(claimsByUserDto.userId));
    const claimsWithUser = [];
    for (const claim of userClaims) {
      claimsWithUser.push({ ...claim, user });
    }

    return await this.attachCommentsToClaims(claimsWithUser);
  }

  public async updateClaim(id: string, updateClaimDto: UpdateClaimDTO): Promise<Claim> {
    await this.claimRepository.createQueryBuilder().update(Claim).set({ ...updateClaimDto }).where('id = :id', { id }).execute();

    return this.claimRepository.findOne({ where: { id } });
  }

  public async attachCommentsToClaims(claims: any[]): Promise<{ claim: Claim; user: User; claimComments: ClaimComment[] }[]>{
    const claimsWithComments = [];

    for (const claim of claims) {
      claimsWithComments.push({...claim, claimComments: await this.claimCommentService.getClaimComments(claim.id)});
    }

    return await claimsWithComments;
  }
}
