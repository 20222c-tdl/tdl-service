import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
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

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  constructor(partial: Partial<Claim>) {
    Object.assign(this, partial);
  }
}

export default Claim;
