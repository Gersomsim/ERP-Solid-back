import {
  type ISaleReturnItemRepository,
  SaleReturnItem,
} from '@features/sales/sale-return-item/domain';
import { SaleReturnItemToken } from '@features/sales/sale-return-item/infra/persistence';
import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateSaleReturnItemCommand } from '../impl/create-sale-return-item.command';

@CommandHandler(CreateSaleReturnItemCommand)
export class CreateSaleReturnItemHandler
  implements ICommandHandler<CreateSaleReturnItemCommand>
{
  constructor(
    @Inject(SaleReturnItemToken)
    private readonly repository: ISaleReturnItemRepository,
  ) {}

  async execute(command: CreateSaleReturnItemCommand): Promise<SaleReturnItem> {
    const item = SaleReturnItem.create(
      command.saleReturnId,
      command.saleItemId,
      command.productId,
      command.quantity,
      command.unitPrice,
    );
    return this.repository.create(item);
  }
}
