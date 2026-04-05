import { Pagination } from '@features/common/interfaces';
import {
  type ISaleReturnRepository,
  SaleReturn,
} from '@features/sales/sale-return/domain';
import { SaleReturnToken } from '@features/sales/sale-return/infra/persistence';
import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindAllSaleReturnsQuery } from '../impl/find-all-sale-returns.query';

@QueryHandler(FindAllSaleReturnsQuery)
export class FindAllSaleReturnsHandler
  implements IQueryHandler<FindAllSaleReturnsQuery>
{
  constructor(
    @Inject(SaleReturnToken)
    private readonly repository: ISaleReturnRepository,
  ) {}

  async execute(
    query: FindAllSaleReturnsQuery,
  ): Promise<Pagination<SaleReturn>> {
    return this.repository.findAll({
      tenantId: query.tenantId,
      page: query.page,
      limit: query.limit,
      status: query.status,
      saleId: query.saleId,
    });
  }
}
