import { EntityNotFoundException } from '@features/common/exceptions';
import { type ISaleItemRepository } from '@features/sales/sale-item/domain';
import { SaleItemToken } from '@features/sales/sale-item/infra/persistence';
import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteSaleItemCommand } from '../impl/delete-sale-item.command';

@CommandHandler(DeleteSaleItemCommand)
export class DeleteSaleItemHandler
  implements ICommandHandler<DeleteSaleItemCommand>
{
  constructor(
    @Inject(SaleItemToken)
    private readonly saleItemRepository: ISaleItemRepository,
  ) {}

  async execute(command: DeleteSaleItemCommand): Promise<void> {
    const item = await this.saleItemRepository.findById(command.id);
    if (!item) throw new EntityNotFoundException('SaleItem', command.id);
    await this.saleItemRepository.delete(command.id);
  }
}
