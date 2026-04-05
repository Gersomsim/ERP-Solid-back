import { EntityNotFoundException } from '@features/common/exceptions';
import { type IPriceListRepository } from '@features/sales/price-list/domain';
import { PriceListToken } from '@features/sales/price-list/infra/persistence';
import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeletePriceListCommand } from '../impl/delete-price-list.command';

@CommandHandler(DeletePriceListCommand)
export class DeletePriceListHandler
  implements ICommandHandler<DeletePriceListCommand>
{
  constructor(
    @Inject(PriceListToken)
    private readonly repository: IPriceListRepository,
  ) {}

  async execute(command: DeletePriceListCommand): Promise<void> {
    const priceList = await this.repository.findById(command.id);
    if (!priceList) throw new EntityNotFoundException('PriceList', command.id);
    await this.repository.delete(command.id);
  }
}
