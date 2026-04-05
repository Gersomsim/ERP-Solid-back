import { EntityNotFoundException } from '@features/common/exceptions';
import {
  type ISaleReturnItemRepository,
  SaleReturnItem,
} from '@features/sales/sale-return-item/domain';
import { SaleReturnItemToken } from '@features/sales/sale-return-item/infra/persistence';
import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindSaleReturnItemQuery } from '../impl/find-sale-return-item.query';

@QueryHandler(FindSaleReturnItemQuery)
export class FindSaleReturnItemHandler
  implements IQueryHandler<FindSaleReturnItemQuery>
{
  constructor(
    @Inject(SaleReturnItemToken)
    private readonly repository: ISaleReturnItemRepository,
  ) {}

  async execute(query: FindSaleReturnItemQuery): Promise<SaleReturnItem> {
    const item = await this.repository.findById(query.id);
    if (!item) throw new EntityNotFoundException('SaleReturnItem', query.id);
    return item;
  }
}
