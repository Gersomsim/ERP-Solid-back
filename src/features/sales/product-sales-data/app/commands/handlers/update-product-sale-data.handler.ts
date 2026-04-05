import { EntityNotFoundException } from '@features/common/exceptions';
import {
  type IProductSaleDataRepository,
  ProductSaleData,
} from '@features/sales/product-sales-data/domain';
import { ProductSaleDataToken } from '@features/sales/product-sales-data/infra/persistence';
import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateProductSaleDataCommand } from '../impl/update-product-sale-data.command';

@CommandHandler(UpdateProductSaleDataCommand)
export class UpdateProductSaleDataHandler
  implements ICommandHandler<UpdateProductSaleDataCommand>
{
  constructor(
    @Inject(ProductSaleDataToken)
    private readonly repository: IProductSaleDataRepository,
  ) {}

  async execute(command: UpdateProductSaleDataCommand): Promise<ProductSaleData> {
    const data = await this.repository.findById(command.id);
    if (!data) throw new EntityNotFoundException('ProductSaleData', command.id);

    if (command.price !== undefined) data.price = command.price;
    if (command.taxType !== undefined) data.taxType = command.taxType;
    if (command.isAvailableForSale !== undefined)
      data.isAvailableForSale = command.isAvailableForSale;

    return this.repository.update(data);
  }
}
