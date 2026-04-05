import { EntityNotFoundException } from '@features/common/exceptions';
import { type ISaleItemRepository, SaleItem } from '@features/sales/sale-item/domain';
import { SaleItemToken } from '@features/sales/sale-item/infra/persistence';
import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateSaleItemCommand } from '../impl/update-sale-item.command';

@CommandHandler(UpdateSaleItemCommand)
export class UpdateSaleItemHandler
  implements ICommandHandler<UpdateSaleItemCommand>
{
  constructor(
    @Inject(SaleItemToken)
    private readonly saleItemRepository: ISaleItemRepository,
  ) {}

  async execute(command: UpdateSaleItemCommand): Promise<SaleItem> {
    const item = await this.saleItemRepository.findById(command.id);
    if (!item) throw new EntityNotFoundException('SaleItem', command.id);

    if (command.quantity !== undefined) item.quantity = command.quantity;
    if (command.unitPrice !== undefined) item.unitPrice = command.unitPrice;
    if (command.tax !== undefined) item.tax = command.tax;
    if (command.discount !== undefined) item.discount = command.discount;
    if (command.total !== undefined) item.total = command.total;

    return this.saleItemRepository.update(item);
  }
}
