import { EntityNotFoundException } from '@features/common/exceptions';
import { type ICommissionRuleRepository } from '@features/sales/commission-rule/domain';
import { CommissionRuleToken } from '@features/sales/commission-rule/infra/persistence';
import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteCommissionRuleCommand } from '../impl/delete-commission-rule.command';

@CommandHandler(DeleteCommissionRuleCommand)
export class DeleteCommissionRuleHandler
  implements ICommandHandler<DeleteCommissionRuleCommand>
{
  constructor(
    @Inject(CommissionRuleToken)
    private readonly repository: ICommissionRuleRepository,
  ) {}

  async execute(command: DeleteCommissionRuleCommand): Promise<void> {
    const rule = await this.repository.findById(command.id);
    if (!rule) throw new EntityNotFoundException('CommissionRule', command.id);
    await this.repository.delete(command.id);
  }
}
