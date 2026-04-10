import { EntityNotFoundException } from '@features/common/exceptions';
import {
  Product,
  type IProductRepository,
} from '@features/products/product/domain';
import { ProductToken } from '@features/products/product/infra/persistence';
import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindProductQuery } from '../impl/find-product.query';

@QueryHandler(FindProductQuery)
export class FindProductHandler implements IQueryHandler<FindProductQuery> {
  constructor(
    @Inject(ProductToken)
    private readonly productRepository: IProductRepository,
  ) {}

  async execute(query: FindProductQuery): Promise<Product> {
    const product = await this.productRepository.findById(query.id);
    if (!product) throw new EntityNotFoundException('Product', query.id);
    return product;
  }
}
