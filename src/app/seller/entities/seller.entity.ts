import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ProductEntity } from '../../product/entities/product.entity';

@Entity('seller')
export class SellerEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  family: string;

  @Column()
  age: number;

  @OneToMany(() => ProductEntity, (product) => product.id)
  products: ProductEntity[];

  @CreateDateColumn({
    type: 'datetime2',
    default: () => 'SYSDATETIME()',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'datetime2',
    default: () => 'SYSDATETIME()',
    onUpdate: 'SYSDATETIME()',
  })
  updatedAt: Date;
}
