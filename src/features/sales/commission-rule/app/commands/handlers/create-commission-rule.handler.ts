import {
  CommissionRule,
  type ICommissionRuleRepository,
} from '@features/sales/commission-rule/domain';
import { CommissionRuleToken } from '@features/sales/commission-rule/infra/persistence';
import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateCommissionRuleCommand } from '../impl/create-commission-rule.command';

@CommandHandler(CreateCommissionRuleCommand)
export class CreateCommissionRuleHandler
  implements ICommandHandler<CreateCommissionRuleCommand>
{
  constructor(
    @Inject(CommissionRuleToken)
    private readonly repository: ICommissionRuleRepository,
  ) {}

  async execute(command: CreateCommissionRuleCommand): Promise<CommissionRule> {
    const rule = CommissionRule.create(
      command.agentId,
      command.tenantId,
      command.percentage,
    );
    return this.repository.create(rule);
  }
}
