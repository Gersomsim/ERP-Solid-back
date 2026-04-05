import { EntityNotFoundException } from '@features/common/exceptions';
import {
  type ISaleReturnRepository,
  SaleReturn,
} from '@features/sales/sale-return/domain';
import { SaleReturnToken } from '@features/sales/sale-return/infra/persistence';
import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindSaleReturnQuery } from '../impl/find-sale-return.query';

@QueryHandler(FindSaleReturnQuery)
export class FindSaleReturnHandler
  implements IQueryHandler<FindSaleReturnQuery>
{
  constructor(
    @Inject(SaleReturnToken)
    private readonly repository: ISaleReturnRepository,
  ) {}

  async execute(query: FindSaleReturnQuery): Promise<SaleReturn> {
    const saleReturn = await this.repository.findById(query.id);
    if (!saleReturn) throw new EntityNotFoundException('SaleReturn', query.id);
    return saleReturn;
  }
}
