import { EntityNotFoundException } from '@features/common/exceptions';
import { type ISaleRepository } from '@features/sales/sale/domain';
import { SaleToken } from '@features/sales/sale/infra/persistence';
import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteSaleCommand } from '../impl/delete-sale.command';

@CommandHandler(DeleteSaleCommand)
export class DeleteSaleHandler implements ICommandHandler<DeleteSaleCommand> {
  constructor(
    @Inject(SaleToken)
    private readonly saleRepository: ISaleRepository,
  ) {}

  async execute(command: DeleteSaleCommand): Promise<void> {
    const sale = await this.saleRepository.findById(command.id);
    if (!sale) throw new EntityNotFoundException('Sale', command.id);
    await this.saleRepository.delete(command.id);
  }
}
