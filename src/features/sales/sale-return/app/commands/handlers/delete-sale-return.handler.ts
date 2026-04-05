import { EntityNotFoundException } from '@features/common/exceptions';
import { type ISaleReturnRepository } from '@features/sales/sale-return/domain';
import { SaleReturnToken } from '@features/sales/sale-return/infra/persistence';
import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteSaleReturnCommand } from '../impl/delete-sale-return.command';

@CommandHandler(DeleteSaleReturnCommand)
export class DeleteSaleReturnHandler
  implements ICommandHandler<DeleteSaleReturnCommand>
{
  constructor(
    @Inject(SaleReturnToken)
    private readonly repository: ISaleReturnRepository,
  ) {}

  async execute(command: DeleteSaleReturnCommand): Promise<void> {
    const saleReturn = await this.repository.findById(command.id);
    if (!saleReturn) throw new EntityNotFoundException('SaleReturn', command.id);
    await this.repository.delete(command.id);
  }
}
