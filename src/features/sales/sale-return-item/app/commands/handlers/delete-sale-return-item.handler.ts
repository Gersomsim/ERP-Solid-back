import { EntityNotFoundException } from '@features/common/exceptions';
import { type ISaleReturnItemRepository } from '@features/sales/sale-return-item/domain';
import { SaleReturnItemToken } from '@features/sales/sale-return-item/infra/persistence';
import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteSaleReturnItemCommand } from '../impl/delete-sale-return-item.command';

@CommandHandler(DeleteSaleReturnItemCommand)
export class DeleteSaleReturnItemHandler
  implements ICommandHandler<DeleteSaleReturnItemCommand>
{
  constructor(
    @Inject(SaleReturnItemToken)
    private readonly repository: ISaleReturnItemRepository,
  ) {}

  async execute(command: DeleteSaleReturnItemCommand): Promise<void> {
    const item = await this.repository.findById(command.id);
    if (!item) throw new EntityNotFoundException('SaleReturnItem', command.id);
    await this.repository.delete(command.id);
  }
}
