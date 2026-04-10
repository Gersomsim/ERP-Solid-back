import { EntityNotFoundException } from '@features/common/exceptions';
import {
  Product,
  type IProductRepository,
} from '@features/products/product/domain';
import { ProductToken } from '@features/products/product/infra/persistence';
import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateProductCommand } from '../impl/update-product.command';

@CommandHandler(UpdateProductCommand)
export class UpdateProductHandler implements ICommandHandler<UpdateProductCommand> {
  constructor(
    @Inject(ProductToken)
    private readonly productRepository: IProductRepository,
  ) {}

  async execute(command: UpdateProductCommand): Promise<Product> {
    const product = await this.productRepository.findById(command.id);
    if (!product) throw new EntityNotFoundException('Product', command.id);

    if (command.name !== undefined) product.name = command.name;
    if (command.sku !== undefined) product.sku = command.sku;
    if (command.description !== undefined) product.description = command.description;
    if (command.active !== undefined) product.active = command.active;
    if (command.storable !== undefined) product.storable = command.storable;
    if (command.sellable !== undefined) product.sellable = command.sellable;
    if (command.buyable !== undefined) product.buyable = command.buyable;
    if (command.service !== undefined) product.service = command.service;

    return this.productRepository.update(product);
  }
}
