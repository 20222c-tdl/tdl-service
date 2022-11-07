import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Category {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty()
  public id: string;

  @Column()
  @ApiProperty()
  public name: string;

  constructor(partial: Partial<Category>) {
    Object.assign(this, partial);
  }
}
