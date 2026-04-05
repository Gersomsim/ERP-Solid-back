import { EntityNotFoundException } from '@features/common/exceptions';
import { Pagination } from '@features/common/interfaces';
import { setPagination } from '@features/common/utils';
import {
  FindAllSaleItemsParams,
  ISaleItemRepository,
  SaleItem,
} from '@features/sales/sale-item/domain';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SaleItem as SaleItemEntity } from './sale-item.entity';

@Injectable()
export class TypeOrmSaleItemRepository implements ISaleItemRepository {
  constructor(
    @InjectRepository(SaleItemEntity)
    private readonly repository: Repository<SaleItemEntity>,
  ) {}

  async create(item: SaleItem): Promise<SaleItem> {
    const entity = this.repository.create({
      saleId: item.saleId,
      productId: item.productId,
      quantity: item.quantity,
      unitPrice: item.unitPrice,
      tax: item.tax,
      discount: item.discount,
      total: item.total,
    });
    const saved = await this.repository.save(entity);
    return this.toDomain(saved);
  }

  async findById(id: string): Promise<SaleItem | null> {
    const entity = await this.repository.findOne({ where: { id } as any });
    return entity ? this.toDomain(entity) : null;
  }

  async findAll(params: FindAllSaleItemsParams): Promise<Pagination<SaleItem>> {
    const { saleId, page = 1, limit = 10 } = params;

    const [items, totalItems] = await this.repository.findAndCount({
      where: { saleId },
      skip: (page - 1) * limit,
      take: limit,
      order: { createdAt: 'DESC' },
    });

    return {
      data: items.map((item) => this.toDomain(item)),
      pagination: setPagination(totalItems, limit, page, items.length),
    };
  }

  async update(item: SaleItem): Promise<SaleItem> {
    const entity = await this.repository.findOne({
      where: { id: item.id } as any,
    });
    if (!entity) throw new EntityNotFoundException('SaleItem', item.id);

    entity.quantity = item.quantity;
    entity.unitPrice = item.unitPrice;
    entity.tax = item.tax;
    entity.discount = item.discount;
    entity.total = item.total;

    const saved = await this.repository.save(entity);
    return this.toDomain(saved);
  }

  async delete(id: string): Promise<void> {
    const entity = await this.repository.findOne({ where: { id } as any });
    if (!entity) throw new EntityNotFoundException('SaleItem', id);
    await this.repository.softRemove(entity);
  }

  private toDomain(entity: SaleItemEntity): SaleItem {
    const item = new SaleItem();
    item.id = String(entity.id);
    item.saleId = entity.saleId;
    item.productId = entity.productId;
    item.quantity = entity.quantity;
    item.unitPrice = Number(entity.unitPrice);
    item.tax = Number(entity.tax);
    item.discount = Number(entity.discount);
    item.total = Number(entity.total);
    return item;
  }
}
