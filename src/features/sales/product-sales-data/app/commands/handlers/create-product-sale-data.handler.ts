import {
  type IProductSaleDataRepository,
  ProductSaleData,
} from '@features/sales/product-sales-data/domain';
import { ProductSaleDataToken } from '@features/sales/product-sales-data/infra/persistence';
import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateProductSaleDataCommand } from '../impl/create-product-sale-data.command';

@CommandHandler(CreateProductSaleDataCommand)
export class CreateProductSaleDataHandler
  implements ICommandHandler<CreateProductSaleDataCommand>
{
  constructor(
    @Inject(ProductSaleDataToken)
    private readonly repository: IProductSaleDataRepository,
  ) {}

  async execute(command: CreateProductSaleDataCommand): Promise<ProductSaleData> {
    const data = ProductSaleData.create(
      command.productId,
      command.tenantId,
      command.price,
      command.taxType,
      command.isAvailableForSale,
    );
    return this.repository.create(data);
  }
}
