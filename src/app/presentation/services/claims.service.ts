import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CommunitiesService } from './community.service';
import Claim from '../../domain/entities/claims/claim.entity';
import { UsersService } from './users.service';
import { ClaimsByCommunityDTO } from '../../infrastructure/dtos/claims/claims-by-community.dto';
import { RegisterClaimDTO } from '../../infrastructure/dtos/claims/claim-register.dto';
import { ClaimStatus } from '../../domain/entities/claims/claim.entity.status';
import User from '../../domain/entities/users/user.entity';
import { ClaimsByUserDTO } from '../../infrastructure/dtos/claims/claims-by-user.dto';


@Injectable()
export class ClaimsService {
  constructor(
    @InjectRepository(Claim)
    private claimRepository: Repository<Claim>,
    private readonly communitiesService: CommunitiesService,
    private readonly usersService: UsersService
  ) {}

  public getStatus(): string {
    return 'Claim Service is running!';
  }

  public async registerClaim(newClaim: RegisterClaimDTO): Promise<Claim> {

    if ( !(await this.communitiesService.existsCommunity(newClaim.communityId))) {
      throw new BadRequestException('This community does not exist!');
    }

    if ( !(await this.usersService.existsUser(newClaim.userId))) {
        throw new BadRequestException('This user does not exist!');
    }

    return await this.claimRepository.save(new Claim({...newClaim, status: ClaimStatus.OPEN}));
  }


  public async getClaimsByCommunity(claimsByCommunityDTO: ClaimsByCommunityDTO): Promise<{claim: Claim, user: User }[]> {
    const { communityId } = claimsByCommunityDTO;


    if ( !(await this.communitiesService.existsCommunity(communityId))) {
        throw new BadRequestException('This community does not exist!');
    }

    const claims = await this.claimRepository
      .createQueryBuilder('claim')
      .where('claim.communityId = :communityId', { communityId })
      .getMany();

    let claimsWithUser = [];
    for (const claim of claims) {
      const user = (await this.usersService.getUserById(claim.userId));
      claimsWithUser.push({claim, user});
    };

    console.log("claimsWithUser", claimsWithUser);
    return await claimsWithUser
  }

  public async updateClaimStatus(id: string, status: ClaimStatus): Promise<Claim> {
    await this.claimRepository.createQueryBuilder().update(Claim).set({status}).where('id = :id', {id}).execute();

    return this.claimRepository.findOne({where : {id}});
  }

  public async getClaimsByUser(claimsByUserDto: ClaimsByUserDTO): Promise<Claim[]> {
    return await this.claimRepository.find({where: {userId: claimsByUserDto.userId}});
  }
}
