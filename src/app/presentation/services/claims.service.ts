import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import User from 'src/app/domain/entities/users/user.entity';
import { LoginUserDTO } from 'src/app/infrastructure/dtos/users/user-login.dto';
import { RegisterUserDTO } from 'src/app/infrastructure/dtos/users/user-register.dto';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { CommunitiesService } from './community.service';
import Claim from 'src/app/domain/entities/claims/claim.entity';
import { UsersService } from './users.service';
import { ClaimsByCommunityDTO } from 'src/app/infrastructure/dtos/claims/cliams-by-community.dto';
import { RegisterClaimDTO } from 'src/app/infrastructure/dtos/claims/claim-register.dto';

@Injectable()
export class ClaimsService {
  constructor(
    @InjectRepository(Claim)
    private claimRepository: Repository<Claim>,
    private readonly claimsService: ClaimsService,
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

    return await this.claimRepository.save(new Claim(newClaim));
  }


  private async getClaimsByCommunity(claimsByCommunityDTO: ClaimsByCommunityDTO) {
    const { communityId } = claimsByCommunityDTO;


    if ( !(await this.communitiesService.existsCommunity(communityId))) {
        throw new BadRequestException('This community does not exist!');
    }

    const communities = await this.claimRepository
      .createQueryBuilder('claim')
      .where('claim.communityId = :communityId', { communityId })
      .getMany();

    return !!communities;
  }
}
