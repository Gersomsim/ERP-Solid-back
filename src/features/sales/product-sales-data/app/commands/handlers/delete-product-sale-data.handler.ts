import { EntityNotFoundException } from '@features/common/exceptions';
import { type IProductSaleDataRepository } from '@features/sales/product-sales-data/domain';
import { ProductSaleDataToken } from '@features/sales/product-sales-data/infra/persistence';
import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteProductSaleDataCommand } from '../impl/delete-product-sale-data.command';

@CommandHandler(DeleteProductSaleDataCommand)
export class DeleteProductSaleDataHandler
  implements ICommandHandler<DeleteProductSaleDataCommand>
{
  constructor(
    @Inject(ProductSaleDataToken)
    private readonly repository: IProductSaleDataRepository,
  ) {}

  async execute(command: DeleteProductSaleDataCommand): Promise<void> {
    const data = await this.repository.findById(command.id);
    if (!data) throw new EntityNotFoundException('ProductSaleData', command.id);
    await this.repository.delete(command.id);
  }
}
