import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Exclude } from 'class-transformer';
import * as bcrypt from 'bcrypt';
import { Category } from '../categories/category.entity';

@Entity()
export class Provider {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  public email: string;

  @Column()
  @Exclude()
  public password: string;

  @Column()
  public firstName: string;

  @Column()
  public lastName: string;

  @Column()
  public phoneNumber: string;

  @Column({ nullable: true })
  categoryId: string;

  @ManyToOne(() => Category, (category) => category.id)
  @JoinColumn()
  category: Category;

  constructor(partial: Partial<Provider>) {
    Object.assign(this, partial);
  }

  @BeforeInsert()
  private async hashPassword() {
    const saltOrRounds = 10;
    this.password = await bcrypt.hash(this.password, saltOrRounds);
  }
}
