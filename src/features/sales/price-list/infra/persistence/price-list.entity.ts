import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('price_lists')
export class PriceListEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ name: 'tenant_id' })
  tenantId: string;

  @Column({ name: 'is_default', default: false })
  isDefault: boolean;

  @Column({ name: 'valid_from', nullable: true, type: 'date' })
  validFrom: Date | null;

  @Column({ name: 'valid_to', nullable: true, type: 'date' })
  validTo: Date | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date | null;
}
