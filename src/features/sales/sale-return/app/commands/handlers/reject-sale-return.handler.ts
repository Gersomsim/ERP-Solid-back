import { EntityNotFoundException } from '@features/common/exceptions';
import {
  type ISaleReturnRepository,
  SaleReturn,
  SaleReturnStatus,
} from '@features/sales/sale-return/domain';
import { SaleReturnToken } from '@features/sales/sale-return/infra/persistence';
import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RejectSaleReturnCommand } from '../impl/reject-sale-return.command';

@CommandHandler(RejectSaleReturnCommand)
export class RejectSaleReturnHandler
  implements ICommandHandler<RejectSaleReturnCommand>
{
  constructor(
    @Inject(SaleReturnToken)
    private readonly repository: ISaleReturnRepository,
  ) {}

  async execute(command: RejectSaleReturnCommand): Promise<SaleReturn> {
    const saleReturn = await this.repository.findById(command.id);
    if (!saleReturn) throw new EntityNotFoundException('SaleReturn', command.id);
    saleReturn.status = SaleReturnStatus.REJECTED;
    return this.repository.update(saleReturn);
  }
}
