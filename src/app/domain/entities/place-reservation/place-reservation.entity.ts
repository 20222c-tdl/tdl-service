import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class PlaceReservation {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  placeId: string;

  @Column()
  userId: string;

  @Column()
  startingDate: Date;

  @Column()
  finishingDate: Date;

  constructor(partial: Partial<PlaceReservation>) {
    Object.assign(this, partial);
  }

}

export default PlaceReservation;

