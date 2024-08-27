import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { SellerEntity } from '../../seller/entities/seller.entity';

@Entity('product')
export class ProductEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @ManyToOne(() => SellerEntity, (seller) => seller.id)
  seller: SellerEntity;

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
