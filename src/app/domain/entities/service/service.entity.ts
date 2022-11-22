import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ServiceMonetizationType } from './service.entity.monetization.type';

@Entity()
class Service {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  public title: string;

  @Column()
  public description: string;

  @Column()
  public price: number;

  @Column()
  public monetizationType: ServiceMonetizationType;

  @Column()
  public providerId: string;

  constructor(partial: Partial<Service>) {
    Object.assign(this, partial);
  }

}

export default Service;
