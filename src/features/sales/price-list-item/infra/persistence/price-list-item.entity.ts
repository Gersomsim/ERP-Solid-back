import { ProductSaleData } from '@features/sales/product-sales-data/infra/persistence/product-sale-data.entity';
import { PriceListEntity } from '@features/sales/price-list/infra/persistence/price-list.entity';
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

@Entity('price_list_items')
export class PriceListItemEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'price_list_id' })
  priceListId: string;

  @Column({ name: 'product_sale_data_id' })
  productSaleDataId: string;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  price: number;

  @Column({ name: 'min_quantity', default: 1 })
  minQuantity: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date | null;

  @ManyToOne(() => PriceListEntity)
  @JoinColumn({ name: 'price_list_id' })
  priceList: PriceListEntity;

  @ManyToOne(() => ProductSaleData)
  @JoinColumn({ name: 'product_sale_data_id' })
  productSaleData: ProductSaleData;
}
