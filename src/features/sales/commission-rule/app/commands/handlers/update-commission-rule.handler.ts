import {
  CommissionRule,
  type ICommissionRuleRepository,
} from '@features/sales/commission-rule/domain';
import { CommissionRuleToken } from '@features/sales/commission-rule/infra/persistence';
import { EntityNotFoundException } from '@features/common/exceptions';
import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateCommissionRuleCommand } from '../impl/update-commission-rule.command';

@CommandHandler(UpdateCommissionRuleCommand)
export class UpdateCommissionRuleHandler
  implements ICommandHandler<UpdateCommissionRuleCommand>
{
  constructor(
    @Inject(CommissionRuleToken)
    private readonly repository: ICommissionRuleRepository,
  ) {}

  async execute(command: UpdateCommissionRuleCommand): Promise<CommissionRule> {
    const rule = await this.repository.findById(command.id);
    if (!rule) throw new EntityNotFoundException('CommissionRule', command.id);

    if (command.percentage !== undefined) rule.percentage = command.percentage;
    if (command.isActive !== undefined) rule.isActive = command.isActive;

    return this.repository.update(rule);
  }
}
