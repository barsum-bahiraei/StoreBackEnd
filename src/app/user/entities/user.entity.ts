import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  family: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  age: number;

  @Column({ default: false })
  confirmEmail: boolean;

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
