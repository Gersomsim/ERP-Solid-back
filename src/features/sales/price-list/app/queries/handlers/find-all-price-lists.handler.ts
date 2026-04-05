import { Pagination } from '@features/common/interfaces';
import {
  type IPriceListRepository,
  PriceList,
} from '@features/sales/price-list/domain';
import { PriceListToken } from '@features/sales/price-list/infra/persistence';
import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindAllPriceListsQuery } from '../impl/find-all-price-lists.query';

@QueryHandler(FindAllPriceListsQuery)
export class FindAllPriceListsHandler
  implements IQueryHandler<FindAllPriceListsQuery>
{
  constructor(
    @Inject(PriceListToken)
    private readonly repository: IPriceListRepository,
  ) {}

  async execute(
    query: FindAllPriceListsQuery,
  ): Promise<Pagination<PriceList>> {
    return this.repository.findAll({
      tenantId: query.tenantId,
      page: query.page,
      limit: query.limit,
      search: query.search,
    });
  }
}
