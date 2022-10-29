import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity()
class User {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  public firstName: string;

  @Column()
  public lastName: string;

  @Column()
  public email: string;

  @Column()
  @Exclude()
  public password: string;

  @Column()
  public address: string;

  @Column()
  public phoneNumber: string;

  @Column()
  public communityId: string;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}

export default User;
