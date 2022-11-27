import * as bcrypt from 'bcrypt';
import { Exclude } from 'class-transformer';
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { Role } from '../roles/role.enum';

@Entity()
class Community {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  public name: string;

  @Column()
  public email: string;

  @Column()
  @Exclude()
  public password: string;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.COMMUNITY,
  })
  role: Role;

  @Column()
  public photo: string;

  constructor(partial: Partial<Community>) {
    Object.assign(this, partial);
  }

  @BeforeInsert()
  private async hashPassword() {
    const saltOrRounds = 10;
    this.password = await bcrypt.hash(this.password, saltOrRounds);
  }

  
}

export default Community;
