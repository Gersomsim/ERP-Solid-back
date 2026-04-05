import { Pagination } from '@features/common/interfaces';
import {
  CommissionRule,
  type ICommissionRuleRepository,
} from '@features/sales/commission-rule/domain';
import { CommissionRuleToken } from '@features/sales/commission-rule/infra/persistence';
import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindAllCommissionRulesQuery } from '../impl/find-all-commission-rules.query';

@QueryHandler(FindAllCommissionRulesQuery)
export class FindAllCommissionRulesHandler
  implements IQueryHandler<FindAllCommissionRulesQuery>
{
  constructor(
    @Inject(CommissionRuleToken)
    private readonly repository: ICommissionRuleRepository,
  ) {}

  async execute(
    query: FindAllCommissionRulesQuery,
  ): Promise<Pagination<CommissionRule>> {
    return this.repository.findAll({
      tenantId: query.tenantId,
      page: query.page,
      limit: query.limit,
      agentId: query.agentId,
    });
  }
}
