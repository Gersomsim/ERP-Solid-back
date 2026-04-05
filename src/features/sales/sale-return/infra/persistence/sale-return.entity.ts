import { SaleReturnResolution } from '@features/sales/sale-return/domain/sale-return-resolution.enum';
import { SaleReturnStatus } from '@features/sales/sale-return/domain/sale-return-status.enum';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('sale_returns')
export class SaleReturnEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'sale_id' })
  saleId: string;

  @Column({ name: 'tenant_id' })
  tenantId: string;

  @Column()
  reason: string;

  @Column({ default: SaleReturnStatus.PENDING })
  status: SaleReturnStatus;

  @Column({ name: 'resolution_type' })
  resolutionType: SaleReturnResolution;

  @Column({ nullable: true, type: 'text' })
  notes: string | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date | null;
}
