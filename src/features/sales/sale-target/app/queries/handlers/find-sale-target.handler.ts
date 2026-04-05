import { EntityNotFoundException } from '@features/common/exceptions';
import {
  type ISaleTargetRepository,
  SaleTargetView,
} from '@features/sales/sale-target/domain';
import { SaleTargetToken } from '@features/sales/sale-target/infra/persistence';
import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindSaleTargetQuery } from '../impl/find-sale-target.query';

@QueryHandler(FindSaleTargetQuery)
export class FindSaleTargetHandler
  implements IQueryHandler<FindSaleTargetQuery>
{
  constructor(
    @Inject(SaleTargetToken)
    private readonly repository: ISaleTargetRepository,
  ) {}

  async execute(query: FindSaleTargetQuery): Promise<SaleTargetView> {
    const view = await this.repository.findViewById(query.id);
    if (!view) throw new EntityNotFoundException('SaleTarget', query.id);
    return view;
  }
}
