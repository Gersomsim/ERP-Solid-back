import { type ISaleItemRepository, SaleItem } from '@features/sales/sale-item/domain';
import { SaleItemToken } from '@features/sales/sale-item/infra/persistence';
import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateSaleItemCommand } from '../impl/create-sale-item.command';

@CommandHandler(CreateSaleItemCommand)
export class CreateSaleItemHandler
  implements ICommandHandler<CreateSaleItemCommand>
{
  constructor(
    @Inject(SaleItemToken)
    private readonly saleItemRepository: ISaleItemRepository,
  ) {}

  async execute(command: CreateSaleItemCommand): Promise<SaleItem> {
    const item = SaleItem.create(
      command.saleId,
      command.productId,
      command.quantity,
      command.unitPrice,
      command.tax,
      command.discount,
      command.total,
    );
    return this.saleItemRepository.create(item);
  }
}
