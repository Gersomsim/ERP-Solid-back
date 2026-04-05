import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('products')
export class ProductEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true, type: 'text' })
  description: string;

  @Column()
  sku: string;

  @Column({ default: true })
  active: boolean;

  @Column({ default: true })
  storable: boolean;

  @Column({ default: true })
  sellable: boolean;

  @Column({ default: true })
  buyable: boolean;

  @Column({ default: false })
  service: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
