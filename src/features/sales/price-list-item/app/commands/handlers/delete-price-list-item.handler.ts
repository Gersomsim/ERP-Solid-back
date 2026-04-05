import { EntityNotFoundException } from '@features/common/exceptions';
import { type IPriceListItemRepository } from '@features/sales/price-list-item/domain';
import { PriceListItemToken } from '@features/sales/price-list-item/infra/persistence';
import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeletePriceListItemCommand } from '../impl/delete-price-list-item.command';

@CommandHandler(DeletePriceListItemCommand)
export class DeletePriceListItemHandler
  implements ICommandHandler<DeletePriceListItemCommand>
{
  constructor(
    @Inject(PriceListItemToken)
    private readonly repository: IPriceListItemRepository,
  ) {}

  async execute(command: DeletePriceListItemCommand): Promise<void> {
    const item = await this.repository.findById(command.id);
    if (!item) throw new EntityNotFoundException('PriceListItem', command.id);
    await this.repository.delete(command.id);
  }
}
