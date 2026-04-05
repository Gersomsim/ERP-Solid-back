import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('customers')
export class CustomerEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ name: 'tax_id' })
  taxId: string;

  @Column({ nullable: true, type: 'varchar', length: 100 })
  email: string | null;

  @Column({ nullable: true, type: 'varchar', length: 20 })
  phone: string | null;

  @Column({ nullable: true, type: 'varchar', length: 255 })
  address: string | null;

  @Column({ nullable: true, type: 'varchar', length: 100 })
  city: string | null;

  @Column({ nullable: true, type: 'varchar', length: 100 })
  state: string | null;

  @Column({ nullable: true, type: 'varchar', length: 10 })
  zip: string | null;

  @Column({ nullable: true, type: 'varchar', length: 100 })
  country: string | null;

  @Column({ name: 'tenant_id' })
  tenantId: string;

  @Column({ name: 'credit_limit', type: 'decimal', precision: 10, scale: 2 })
  creditLimit: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date | null;
}
