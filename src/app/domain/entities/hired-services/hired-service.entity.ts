import { Exclude } from 'class-transformer';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import HiredProvider from './hired-provider.entity';

@Entity()
class HiredService {
  @PrimaryGeneratedColumn('uuid')
  @Exclude()
  public id: string;

  @Column()
  public serviceId: string;

  @Column({
    nullable: true,
    })
  public hours?: number;

  @Column()
  @ManyToOne(() => HiredProvider, (hiredProvider) => hiredProvider.id)
  @JoinColumn()
  @Exclude()
  public hiredProviderId: string;



  constructor(partial: Partial<HiredService>) {
    Object.assign(this, partial);
  }
}

export default HiredService;
