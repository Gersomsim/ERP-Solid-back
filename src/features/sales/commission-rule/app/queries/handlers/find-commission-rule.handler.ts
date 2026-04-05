import { EntityNotFoundException } from '@features/common/exceptions';
import {
  CommissionRule,
  type ICommissionRuleRepository,
} from '@features/sales/commission-rule/domain';
import { CommissionRuleToken } from '@features/sales/commission-rule/infra/persistence';
import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindCommissionRuleQuery } from '../impl/find-commission-rule.query';

@QueryHandler(FindCommissionRuleQuery)
export class FindCommissionRuleHandler
  implements IQueryHandler<FindCommissionRuleQuery>
{
  constructor(
    @Inject(CommissionRuleToken)
    private readonly repository: ICommissionRuleRepository,
  ) {}

  async execute(query: FindCommissionRuleQuery): Promise<CommissionRule> {
    const rule = await this.repository.findById(query.id);
    if (!rule) throw new EntityNotFoundException('CommissionRule', query.id);
    return rule;
  }
}
