import { Pagination } from '@features/common/interfaces';
import { type ISaleItemRepository, SaleItem } from '@features/sales/sale-item/domain';
import { SaleItemToken } from '@features/sales/sale-item/infra/persistence';
import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindAllSaleItemsQuery } from '../impl/find-all-sale-items.query';

@QueryHandler(FindAllSaleItemsQuery)
export class FindAllSaleItemsHandler
  implements IQueryHandler<FindAllSaleItemsQuery>
{
  constructor(
    @Inject(SaleItemToken)
    private readonly saleItemRepository: ISaleItemRepository,
  ) {}

  async execute(query: FindAllSaleItemsQuery): Promise<Pagination<SaleItem>> {
    return this.saleItemRepository.findAll({
      saleId: query.saleId,
      page: query.page,
      limit: query.limit,
    });
  }
}
