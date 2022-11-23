import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class HiredProvider {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  public userId: string;

  @Column()
  public providerId: string;

  @Column()
  public date: Date;

  @Column()
  public isPaid: boolean;

  constructor(partial: Partial<HiredProvider>) {
    Object.assign(this, partial);
  }
}

export default HiredProvider;
