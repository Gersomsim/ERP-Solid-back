import { EntityNotFoundException } from '@features/common/exceptions';
import {
  type ISaleReturnRepository,
  SaleReturn,
  SaleReturnStatus,
} from '@features/sales/sale-return/domain';
import { SaleReturnToken } from '@features/sales/sale-return/infra/persistence';
import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CompleteSaleReturnCommand } from '../impl/complete-sale-return.command';

@CommandHandler(CompleteSaleReturnCommand)
export class CompleteSaleReturnHandler
  implements ICommandHandler<CompleteSaleReturnCommand>
{
  constructor(
    @Inject(SaleReturnToken)
    private readonly repository: ISaleReturnRepository,
  ) {}

  async execute(command: CompleteSaleReturnCommand): Promise<SaleReturn> {
    const saleReturn = await this.repository.findById(command.id);
    if (!saleReturn) throw new EntityNotFoundException('SaleReturn', command.id);
    saleReturn.status = SaleReturnStatus.COMPLETED;
    return this.repository.update(saleReturn);
  }
}
