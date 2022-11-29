import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class Review {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  public userId: string;

  @Column()
  public providerId: string;

  @Column()
  public hiredServicesId: string;

  @Column()
  public rating: number;

  @Column()
  public comment: string;

  constructor(partial: Partial<Review>) {
    Object.assign(this, partial);
  }

}

export default Review;
