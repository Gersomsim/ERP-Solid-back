import { EntityNotFoundException } from '@features/common/exceptions';
import { Pagination } from '@features/common/interfaces';
import { setPagination } from '@features/common/utils';
import {
  FindAllSaleReturnItemsParams,
  ISaleReturnItemRepository,
  SaleReturnItem,
} from '@features/sales/sale-return-item/domain';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SaleReturnItemEntity } from './sale-return-item.entity';

@Injectable()
export class TypeOrmSaleReturnItemRepository
  implements ISaleReturnItemRepository
{
  constructor(
    @InjectRepository(SaleReturnItemEntity)
    private readonly repository: Repository<SaleReturnItemEntity>,
  ) {}

  async create(item: SaleReturnItem): Promise<SaleReturnItem> {
    const entity = this.repository.create({
      saleReturnId: item.saleReturnId,
      saleItemId: item.saleItemId,
      productId: item.productId,
      quantity: item.quantity,
      unitPrice: item.unitPrice,
      subtotal: item.subtotal,
    });
    const saved = await this.repository.save(entity);
    return this.toDomain(saved);
  }

  async findById(id: string): Promise<SaleReturnItem | null> {
    const entity = await this.repository.findOne({ where: { id } });
    return entity ? this.toDomain(entity) : null;
  }

  async findAll(
    params: FindAllSaleReturnItemsParams,
  ): Promise<Pagination<SaleReturnItem>> {
    const { saleReturnId, page = 1, limit = 10 } = params;

    const [items, totalItems] = await this.repository.findAndCount({
      where: { saleReturnId },
      skip: (page - 1) * limit,
      take: limit,
      order: { createdAt: 'DESC' },
    });

    return {
      data: items.map((item) => this.toDomain(item)),
      pagination: setPagination(totalItems, limit, page, items.length),
    };
  }

  async delete(id: string): Promise<void> {
    const entity = await this.repository.findOne({ where: { id } });
    if (!entity) throw new EntityNotFoundException('SaleReturnItem', id);
    await this.repository.softRemove(entity);
  }

  private toDomain(entity: SaleReturnItemEntity): SaleReturnItem {
    const item = new SaleReturnItem();
    item.id = entity.id;
    item.saleReturnId = entity.saleReturnId;
    item.saleItemId = entity.saleItemId;
    item.productId = entity.productId;
    item.quantity = entity.quantity;
    item.unitPrice = Number(entity.unitPrice);
    item.subtotal = Number(entity.subtotal);
    return item;
  }
}
