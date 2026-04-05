import { Pagination } from '@features/common/interfaces';
import {
  type ISaleAgentRepository,
  SaleAgent,
} from '@features/sales/sale-agent/domain';
import { SaleAgentToken } from '@features/sales/sale-agent/infra/persistence';
import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindAllSaleAgentsQuery } from '../impl/find-all-sale-agents.query';

@QueryHandler(FindAllSaleAgentsQuery)
export class FindAllSaleAgentsHandler implements IQueryHandler<FindAllSaleAgentsQuery> {
  constructor(
    @Inject(SaleAgentToken)
    private readonly saleAgentRepository: ISaleAgentRepository,
  ) {}

  async execute(query: FindAllSaleAgentsQuery): Promise<Pagination<SaleAgent>> {
    return this.saleAgentRepository.findAll({
      tenantId: query.tenantId,
      page: query.page,
      limit: query.limit,
      search: query.search,
    });
  }
}
