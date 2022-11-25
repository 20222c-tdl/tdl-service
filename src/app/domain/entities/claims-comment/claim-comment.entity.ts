import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from '../roles/role.enum';

@Entity()
class ClaimComment {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  public claimId: string;

  @Column()
  public entityId: string;

  @Column()
  public role: Role;

  @Column()
  public comment: string;

  @Column()
  public date: Date;

  constructor(partial: Partial<ClaimComment>) {
    Object.assign(this, partial);
  }
}

export default ClaimComment;
