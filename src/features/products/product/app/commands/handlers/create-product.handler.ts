import {
  Product,
  type IProductRepository,
} from '@features/products/product/domain';
import { ProductToken } from '@features/products/product/infra/persistence';
import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateProductCommand } from '../impl/create-product.command';

@CommandHandler(CreateProductCommand)
export class CreateProductHandler implements ICommandHandler<CreateProductCommand> {
  constructor(
    @Inject(ProductToken)
    private readonly productRepository: IProductRepository,
  ) {}

  async execute(command: CreateProductCommand): Promise<Product> {
    const product = Product.create(
      command.name,
      command.sku,
      command.tenantId,
      command.description,
      command.active,
      command.storable,
      command.sellable,
      command.buyable,
      command.service,
    );
    return this.productRepository.create(product);
  }
}
