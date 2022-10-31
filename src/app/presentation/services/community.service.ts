import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import Community from 'src/app/domain/entities/communities/community.entity';
import { RegisterCommunityDTO } from 'src/app/infrastructure/dtos/communities/community-register.dto';
import { LoginCommunityDTO } from 'src/app/infrastructure/dtos/communities/community-login.dto';

@Injectable()
export class CommunitiesService {
  constructor(
    @InjectRepository(Community)
    private communityRepository: Repository<Community>
  ) {}

  public getStatus(): string {
    return 'Community Service is running!';
  }

  public async registerCommunity(newCommunity: RegisterCommunityDTO): Promise<Community> {
    if (await this.isRegistered(newCommunity.email)) {
      throw new BadRequestException('This email is already in use!');
    }

    return await this.communityRepository.save(new Community(newCommunity));
  }

  public async loginCommunity(communityCredentials: LoginCommunityDTO): Promise<Community> {
    const { email, password } = communityCredentials;

    const community = await this.communityRepository
      .createQueryBuilder('community')
      .where('community.email = :email', { email })
      .getOne();

    if (community && bcrypt.compareSync(password, community.password)) {
      return community;
    }

    throw new BadRequestException('Wrong credentials!');
  }

  private async isRegistered(email: string) {
    const community = await this.communityRepository
      .createQueryBuilder('community')
      .where('community.email = :email', { email })
      .getOne();

    return !!community;
  }

  public async existsCommunity(communityId: string) {
    const id = communityId;
    const community =await this.communityRepository
      .createQueryBuilder('community')
      .where('community.id = :id', { id })
      .getOne();
    
    return !!community;
  }

  public async getAllCommunities(): Promise<Community[]> {
    return await this.communityRepository.find();
  }
}
