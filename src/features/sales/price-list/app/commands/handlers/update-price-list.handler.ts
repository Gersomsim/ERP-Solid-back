import { EntityNotFoundException } from '@features/common/exceptions';
import {
  type IPriceListRepository,
  PriceList,
} from '@features/sales/price-list/domain';
import { PriceListToken } from '@features/sales/price-list/infra/persistence';
import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdatePriceListCommand } from '../impl/update-price-list.command';

@CommandHandler(UpdatePriceListCommand)
export class UpdatePriceListHandler
  implements ICommandHandler<UpdatePriceListCommand>
{
  constructor(
    @Inject(PriceListToken)
    private readonly repository: IPriceListRepository,
  ) {}

  async execute(command: UpdatePriceListCommand): Promise<PriceList> {
    const priceList = await this.repository.findById(command.id);
    if (!priceList) throw new EntityNotFoundException('PriceList', command.id);

    if (command.name !== undefined) priceList.name = command.name;
    if (command.isDefault !== undefined) priceList.isDefault = command.isDefault;
    if (command.validFrom !== undefined) priceList.validFrom = command.validFrom;
    if (command.validTo !== undefined) priceList.validTo = command.validTo;

    return this.repository.update(priceList);
  }
}
