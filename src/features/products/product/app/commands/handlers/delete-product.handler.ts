import { type IProductRepository } from '@features/products/product/domain';
import { ProductToken } from '@features/products/product/infra/persistence';
import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteProductCommand } from '../impl/delete-product.command';

@CommandHandler(DeleteProductCommand)
export class DeleteProductHandler implements ICommandHandler<DeleteProductCommand> {
  constructor(
    @Inject(ProductToken)
    private readonly productRepository: IProductRepository,
  ) {}

  async execute(command: DeleteProductCommand): Promise<void> {
    return this.productRepository.delete(command.id);
  }
}
