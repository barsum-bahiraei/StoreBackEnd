import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('customer')
export class CustomerEntity {
  @PrimaryGeneratedColumn()
  id: number;
}
