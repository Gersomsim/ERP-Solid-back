import { EntityNotFoundException } from '@features/common/exceptions';
import {
  type IProductSaleDataRepository,
  ProductSaleDataView,
} from '@features/sales/product-sales-data/domain';
import { ProductSaleDataToken } from '@features/sales/product-sales-data/infra/persistence';
import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindProductSaleDataQuery } from '../impl/find-product-sale-data.query';

@QueryHandler(FindProductSaleDataQuery)
export class FindProductSaleDataHandler
  implements IQueryHandler<FindProductSaleDataQuery>
{
  constructor(
    @Inject(ProductSaleDataToken)
    private readonly repository: IProductSaleDataRepository,
  ) {}

  async execute(query: FindProductSaleDataQuery): Promise<ProductSaleDataView> {
    const view = await this.repository.findViewById(query.id);
    if (!view)
      throw new EntityNotFoundException('ProductSaleData', query.id);
    return view;
  }
}
