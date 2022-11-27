import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class Place {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  public communityId: string;

  @Column()
  public name: string;

  @Column()
  public description: string;

  constructor(partial: Partial<Place>) {
    Object.assign(this, partial);
  }

}

export default Place;
