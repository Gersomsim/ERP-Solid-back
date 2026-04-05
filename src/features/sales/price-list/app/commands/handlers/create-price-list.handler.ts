import {
  type IPriceListRepository,
  PriceList,
} from '@features/sales/price-list/domain';
import { PriceListToken } from '@features/sales/price-list/infra/persistence';
import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreatePriceListCommand } from '../impl/create-price-list.command';

@CommandHandler(CreatePriceListCommand)
export class CreatePriceListHandler
  implements ICommandHandler<CreatePriceListCommand>
{
  constructor(
    @Inject(PriceListToken)
    private readonly repository: IPriceListRepository,
  ) {}

  async execute(command: CreatePriceListCommand): Promise<PriceList> {
    const priceList = PriceList.create(
      command.name,
      command.tenantId,
      command.isDefault,
      command.validFrom,
      command.validTo,
    );
    return this.repository.create(priceList);
  }
}
