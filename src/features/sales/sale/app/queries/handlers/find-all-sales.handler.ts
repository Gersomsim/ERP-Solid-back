import { Pagination } from '@features/common/interfaces';
import { type ISaleRepository, Sale } from '@features/sales/sale/domain';
import { SaleToken } from '@features/sales/sale/infra/persistence';
import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindAllSalesQuery } from '../impl/find-all-sales.query';

@QueryHandler(FindAllSalesQuery)
export class FindAllSalesHandler implements IQueryHandler<FindAllSalesQuery> {
  constructor(
    @Inject(SaleToken)
    private readonly saleRepository: ISaleRepository,
  ) {}

  async execute(query: FindAllSalesQuery): Promise<Pagination<Sale>> {
    return this.saleRepository.findAll({
      tenantId: query.tenantId,
      page: query.page,
      limit: query.limit,
      search: query.search,
      status: query.status,
      customerId: query.customerId,
      saleAgentId: query.saleAgentId,
    });
  }
}
