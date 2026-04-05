import { CommissionPaymentStatus } from '@features/sales/commission-payment/domain/commission-payment-status.enum';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('commission_payments')
export class CommissionPaymentEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'agent_id' })
  agentId: string;

  @Column({ name: 'tenant_id' })
  tenantId: string;

  @Column({ name: 'period_from', type: 'date' })
  periodFrom: Date;

  @Column({ name: 'period_to', type: 'date' })
  periodTo: Date;

  @Column({ name: 'total_amount', type: 'decimal', precision: 12, scale: 2 })
  totalAmount: number;

  @Column({ default: CommissionPaymentStatus.DRAFT })
  status: CommissionPaymentStatus;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date | null;
}
