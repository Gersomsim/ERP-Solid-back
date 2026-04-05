import { Pagination } from '@features/common/interfaces';
import {
  type IPriceListItemRepository,
  PriceListItemView,
} from '@features/sales/price-list-item/domain';
import { PriceListItemToken } from '@features/sales/price-list-item/infra/persistence';
import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindAllPriceListItemsQuery } from '../impl/find-all-price-list-items.query';

@QueryHandler(FindAllPriceListItemsQuery)
export class FindAllPriceListItemsHandler
  implements IQueryHandler<FindAllPriceListItemsQuery>
{
  constructor(
    @Inject(PriceListItemToken)
    private readonly repository: IPriceListItemRepository,
  ) {}

  async execute(
    query: FindAllPriceListItemsQuery,
  ): Promise<Pagination<PriceListItemView>> {
    return this.repository.findAllView({
      priceListId: query.priceListId,
      page: query.page,
      limit: query.limit,
      search: query.search,
    });
  }
}
