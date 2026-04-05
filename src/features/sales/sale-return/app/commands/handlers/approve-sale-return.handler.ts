import { EntityNotFoundException } from '@features/common/exceptions';
import {
  type ISaleReturnRepository,
  SaleReturn,
  SaleReturnStatus,
} from '@features/sales/sale-return/domain';
import { SaleReturnToken } from '@features/sales/sale-return/infra/persistence';
import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ApproveSaleReturnCommand } from '../impl/approve-sale-return.command';

@CommandHandler(ApproveSaleReturnCommand)
export class ApproveSaleReturnHandler
  implements ICommandHandler<ApproveSaleReturnCommand>
{
  constructor(
    @Inject(SaleReturnToken)
    private readonly repository: ISaleReturnRepository,
  ) {}

  async execute(command: ApproveSaleReturnCommand): Promise<SaleReturn> {
    const saleReturn = await this.repository.findById(command.id);
    if (!saleReturn) throw new EntityNotFoundException('SaleReturn', command.id);
    saleReturn.status = SaleReturnStatus.APPROVED;
    return this.repository.update(saleReturn);
  }
}
