import { EntityNotFoundException } from '@features/common/exceptions';
import {
  type IPriceListItemRepository,
  PriceListItem,
} from '@features/sales/price-list-item/domain';
import { PriceListItemToken } from '@features/sales/price-list-item/infra/persistence';
import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdatePriceListItemCommand } from '../impl/update-price-list-item.command';

@CommandHandler(UpdatePriceListItemCommand)
export class UpdatePriceListItemHandler
  implements ICommandHandler<UpdatePriceListItemCommand>
{
  constructor(
    @Inject(PriceListItemToken)
    private readonly repository: IPriceListItemRepository,
  ) {}

  async execute(command: UpdatePriceListItemCommand): Promise<PriceListItem> {
    const item = await this.repository.findById(command.id);
    if (!item) throw new EntityNotFoundException('PriceListItem', command.id);

    if (command.price !== undefined) item.price = command.price;
    if (command.minQuantity !== undefined) item.minQuantity = command.minQuantity;

    return this.repository.update(item);
  }
}
