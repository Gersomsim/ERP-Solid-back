import { Pagination } from '@features/common/interfaces';
import {
  type ISaleTargetRepository,
  SaleTargetView,
} from '@features/sales/sale-target/domain';
import { SaleTargetToken } from '@features/sales/sale-target/infra/persistence';
import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindAllSaleTargetsQuery } from '../impl/find-all-sale-targets.query';

@QueryHandler(FindAllSaleTargetsQuery)
export class FindAllSaleTargetsHandler
  implements IQueryHandler<FindAllSaleTargetsQuery>
{
  constructor(
    @Inject(SaleTargetToken)
    private readonly repository: ISaleTargetRepository,
  ) {}

  async execute(
    query: FindAllSaleTargetsQuery,
  ): Promise<Pagination<SaleTargetView>> {
    return this.repository.findAllView({
      tenantId: query.tenantId,
      page: query.page,
      limit: query.limit,
      agentId: query.agentId,
    });
  }
}
