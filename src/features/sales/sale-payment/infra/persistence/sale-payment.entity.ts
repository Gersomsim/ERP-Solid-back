import { PaymentMethodEntity } from '@features/finance/payment-method/infra/persistence/payment-method.entity';
import { SaleEntity } from '@features/sales/sale/infra/persistence';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('sale_payments')
export class SalePaymentEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'sale_id' })
  saleId: string;

  @Column({ name: 'amount' })
  amount: number;

  @Column({ name: 'date' })
  date: Date;

  @Column({ name: 'reference' })
  reference: string;

  @Column({ name: 'payment_method_id' })
  paymentMethodId: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date | null;

  @ManyToOne(() => SaleEntity)
  @JoinColumn({ name: 'sale_id' })
  sale: SaleEntity;

  @ManyToOne(() => PaymentMethodEntity, { eager: true })
  @JoinColumn({ name: 'payment_method_id' })
  paymentMethod: PaymentMethodEntity;
}
