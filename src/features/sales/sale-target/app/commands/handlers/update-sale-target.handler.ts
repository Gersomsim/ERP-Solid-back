import { EntityNotFoundException } from '@features/common/exceptions';
import {
  type ISaleTargetRepository,
  SaleTarget,
} from '@features/sales/sale-target/domain';
import { SaleTargetToken } from '@features/sales/sale-target/infra/persistence';
import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateSaleTargetCommand } from '../impl/update-sale-target.command';

@CommandHandler(UpdateSaleTargetCommand)
export class UpdateSaleTargetHandler
  implements ICommandHandler<UpdateSaleTargetCommand>
{
  constructor(
    @Inject(SaleTargetToken)
    private readonly repository: ISaleTargetRepository,
  ) {}

  async execute(command: UpdateSaleTargetCommand): Promise<SaleTarget> {
    const target = await this.repository.findById(command.id);
    if (!target) throw new EntityNotFoundException('SaleTarget', command.id);

    if (command.agentId !== undefined) target.agentId = command.agentId;
    if (command.periodFrom !== undefined) target.periodFrom = command.periodFrom;
    if (command.periodTo !== undefined) target.periodTo = command.periodTo;
    if (command.targetAmount !== undefined) target.targetAmount = command.targetAmount;

    return this.repository.update(target);
  }
}
