import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class CreditCard {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  public userId: string;

  @Column()
  public number: string;

  @Column()
  public name: string;

  @Column()
  public expirationDate: string;

  @Column()
  public cvc: string;

  constructor(partial: Partial<CreditCard>) {
    Object.assign(this, partial);
  }
}

export default CreditCard;
