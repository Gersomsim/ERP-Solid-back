import { Pagination } from '@features/common/interfaces';
import {
  Commission,
  type ICommissionRepository,
} from '@features/sales/commission/domain';
import { CommissionToken } from '@features/sales/commission/infra/persistence';
import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindAllCommissionsQuery } from '../impl/find-all-commissions.query';

@QueryHandler(FindAllCommissionsQuery)
export class FindAllCommissionsHandler
  implements IQueryHandler<FindAllCommissionsQuery>
{
  constructor(
    @Inject(CommissionToken)
    private readonly repository: ICommissionRepository,
  ) {}

  async execute(
    query: FindAllCommissionsQuery,
  ): Promise<Pagination<Commission>> {
    return this.repository.findAll({
      tenantId: query.tenantId,
      page: query.page,
      limit: query.limit,
      status: query.status,
      agentId: query.agentId,
      saleId: query.saleId,
    });
  }
}
