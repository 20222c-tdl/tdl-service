import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ClaimStatus } from './claim.entity.status';

@Entity()
class Claim {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  public userId: string;

  @Column()
  public communityId: string;

  @Column()
  public type: string;

  @Column()
  public mainIssue: string;

  @Column()
  public description: string;

  @Column()
  public status: ClaimStatus;

  constructor(partial: Partial<Claim>) {
    Object.assign(this, partial);
  }
}

export default Claim;
