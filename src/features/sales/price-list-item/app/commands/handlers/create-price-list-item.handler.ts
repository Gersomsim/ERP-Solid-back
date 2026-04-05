import {
  type IPriceListItemRepository,
  PriceListItem,
} from '@features/sales/price-list-item/domain';
import { PriceListItemToken } from '@features/sales/price-list-item/infra/persistence';
import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreatePriceListItemCommand } from '../impl/create-price-list-item.command';

@CommandHandler(CreatePriceListItemCommand)
export class CreatePriceListItemHandler
  implements ICommandHandler<CreatePriceListItemCommand>
{
  constructor(
    @Inject(PriceListItemToken)
    private readonly repository: IPriceListItemRepository,
  ) {}

  async execute(command: CreatePriceListItemCommand): Promise<PriceListItem> {
    const item = PriceListItem.create(
      command.priceListId,
      command.productSaleDataId,
      command.price,
      command.minQuantity,
    );
    return this.repository.create(item);
  }
}
