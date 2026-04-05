import { Pagination } from '@features/common/interfaces';
import {
  type ISaleReturnItemRepository,
  SaleReturnItem,
} from '@features/sales/sale-return-item/domain';
import { SaleReturnItemToken } from '@features/sales/sale-return-item/infra/persistence';
import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindAllSaleReturnItemsQuery } from '../impl/find-all-sale-return-items.query';

@QueryHandler(FindAllSaleReturnItemsQuery)
export class FindAllSaleReturnItemsHandler
  implements IQueryHandler<FindAllSaleReturnItemsQuery>
{
  constructor(
    @Inject(SaleReturnItemToken)
    private readonly repository: ISaleReturnItemRepository,
  ) {}

  async execute(
    query: FindAllSaleReturnItemsQuery,
  ): Promise<Pagination<SaleReturnItem>> {
    return this.repository.findAll({
      saleReturnId: query.saleReturnId,
      page: query.page,
      limit: query.limit,
    });
  }
}
