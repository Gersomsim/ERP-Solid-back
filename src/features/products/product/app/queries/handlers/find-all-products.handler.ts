import { Pagination } from '@features/common/interfaces';
import {
  Product,
  type IProductRepository,
} from '@features/products/product/domain';
import { ProductToken } from '@features/products/product/infra/persistence';
import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindAllProductsQuery } from '../impl/find-all-products.query';

@QueryHandler(FindAllProductsQuery)
export class FindAllProductsHandler implements IQueryHandler<FindAllProductsQuery> {
  constructor(
    @Inject(ProductToken)
    private readonly productRepository: IProductRepository,
  ) {}

  async execute(query: FindAllProductsQuery): Promise<Pagination<Product>> {
    return this.productRepository.findAll({
      tenantId: query.tenantId,
      page: query.page,
      limit: query.limit,
      search: query.search,
    });
  }
}
