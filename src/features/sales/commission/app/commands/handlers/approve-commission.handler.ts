import { EntityNotFoundException } from '@features/common/exceptions';
import {
  Commission,
  CommissionStatus,
  type ICommissionRepository,
} from '@features/sales/commission/domain';
import { CommissionToken } from '@features/sales/commission/infra/persistence';
import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ApproveCommissionCommand } from '../impl/approve-commission.command';

@CommandHandler(ApproveCommissionCommand)
export class ApproveCommissionHandler
  implements ICommandHandler<ApproveCommissionCommand>
{
  constructor(
    @Inject(CommissionToken)
    private readonly repository: ICommissionRepository,
  ) {}

  async execute(command: ApproveCommissionCommand): Promise<Commission> {
    const commission = await this.repository.findById(command.id);
    if (!commission)
      throw new EntityNotFoundException('Commission', command.id);
    commission.status = CommissionStatus.APPROVED;
    return this.repository.update(commission);
  }
}
