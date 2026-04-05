import { CommissionStatus } from '@features/sales/commission/domain/commission-status.enum';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('commissions')
export class CommissionEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'sale_id' })
  saleId: string;

  @Column({ name: 'agent_id' })
  agentId: string;

  @Column({ name: 'tenant_id' })
  tenantId: string;

  @Column({ name: 'sale_total', type: 'decimal', precision: 12, scale: 2 })
  saleTotal: number;

  @Column({ type: 'decimal', precision: 5, scale: 2 })
  percentage: number;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  amount: number;

  @Column({ default: CommissionStatus.PENDING })
  status: CommissionStatus;

  @Column({ name: 'commission_payment_id', nullable: true })
  commissionPaymentId: string | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
