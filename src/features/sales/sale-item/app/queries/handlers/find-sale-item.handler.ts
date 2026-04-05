import { EntityNotFoundException } from '@features/common/exceptions';
import { type ISaleItemRepository, SaleItem } from '@features/sales/sale-item/domain';
import { SaleItemToken } from '@features/sales/sale-item/infra/persistence';
import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindSaleItemQuery } from '../impl/find-sale-item.query';

@QueryHandler(FindSaleItemQuery)
export class FindSaleItemHandler implements IQueryHandler<FindSaleItemQuery> {
  constructor(
    @Inject(SaleItemToken)
    private readonly saleItemRepository: ISaleItemRepository,
  ) {}

  async execute(query: FindSaleItemQuery): Promise<SaleItem> {
    const item = await this.saleItemRepository.findById(query.id);
    if (!item) throw new EntityNotFoundException('SaleItem', query.id);
    return item;
  }
}
