import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { SaleStatus } from '../../domain';

@Entity('sales')
export class SaleEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'tenant_id' })
  tenantId: string;

  @Column({ name: 'customer_id' })
  customerId: string;

  @Column({ name: 'sale_agent_id' })
  saleAgentId: string;

  @Column()
  folio: string;

  @Column({ name: 'sale_date' })
  saleDate: Date;

  @Column({ name: 'total' })
  total: number;

  @Column({ name: 'tax' })
  tax: number;

  @Column({ name: 'discount' })
  discount: number;

  @Column({ name: 'subtotal' })
  subtotal: number;

  @Column({ name: 'payment_term_id', nullable: true })
  paymentTermId: string | null;

  @Column({ name: 'status', default: 'draft' })
  status: SaleStatus;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date | null;
}
