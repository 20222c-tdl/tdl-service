import { BeforeInsert, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Exclude } from 'class-transformer';
import * as bcrypt from 'bcrypt';
import { Category } from '../categories/category.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../roles/role.enum';

@Entity()
export class Provider {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty()
  public id: string;

  @Column()
  @ApiProperty()
  public email: string;

  @Column()
  @Exclude()
  public password: string;

  @Column()
  @ApiProperty()
  public firstName: string;

  @Column()
  @ApiProperty()
  public lastName: string;

  @Column()
  @ApiProperty()
  public identityNumber: string;

  @Column()
  @ApiProperty()
  public phoneNumber: string;

  @Column()
  @ApiProperty()
  @Exclude()
  categoryId: string;

  @ManyToOne(() => Category, (category) => category.id)
  @JoinColumn()
  category: Category;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.PROVIDER,
  })
  role: Role;

  constructor(partial: Partial<Provider>) {
    Object.assign(this, partial);
  }

  @Column()
  @ApiProperty()
  public photo: string;

  @BeforeInsert()
  private async hashPassword() {
    const saltOrRounds = 10;
    this.password = await bcrypt.hash(this.password, saltOrRounds);
  }
}
