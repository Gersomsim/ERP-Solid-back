import { EntityNotFoundException } from '@features/common/exceptions';
import {
  Commission,
  CommissionStatus,
  type ICommissionRepository,
} from '@features/sales/commission/domain';
import { CommissionToken } from '@features/sales/commission/infra/persistence';
import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CancelCommissionCommand } from '../impl/cancel-commission.command';

@CommandHandler(CancelCommissionCommand)
export class CancelCommissionHandler
  implements ICommandHandler<CancelCommissionCommand>
{
  constructor(
    @Inject(CommissionToken)
    private readonly repository: ICommissionRepository,
  ) {}

  async execute(command: CancelCommissionCommand): Promise<Commission> {
    const commission = await this.repository.findById(command.id);
    if (!commission)
      throw new EntityNotFoundException('Commission', command.id);
    commission.status = CommissionStatus.CANCELLED;
    return this.repository.update(commission);
  }
}
