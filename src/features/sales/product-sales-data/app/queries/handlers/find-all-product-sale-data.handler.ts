import { Pagination } from '@features/common/interfaces';
import {
  type IProductSaleDataRepository,
  ProductSaleDataView,
} from '@features/sales/product-sales-data/domain';
import { ProductSaleDataToken } from '@features/sales/product-sales-data/infra/persistence';
import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindAllProductSaleDataQuery } from '../impl/find-all-product-sale-data.query';

@QueryHandler(FindAllProductSaleDataQuery)
export class FindAllProductSaleDataHandler
  implements IQueryHandler<FindAllProductSaleDataQuery>
{
  constructor(
    @Inject(ProductSaleDataToken)
    private readonly repository: IProductSaleDataRepository,
  ) {}

  async execute(
    query: FindAllProductSaleDataQuery,
  ): Promise<Pagination<ProductSaleDataView>> {
    return this.repository.findAllView({
      tenantId: query.tenantId,
      page: query.page,
      limit: query.limit,
      search: query.search,
      isAvailableForSale: query.isAvailableForSale,
    });
  }
}
