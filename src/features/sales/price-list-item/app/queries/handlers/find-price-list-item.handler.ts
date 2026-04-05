import { EntityNotFoundException } from '@features/common/exceptions';
import {
  type IPriceListItemRepository,
  PriceListItemView,
} from '@features/sales/price-list-item/domain';
import { PriceListItemToken } from '@features/sales/price-list-item/infra/persistence';
import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindPriceListItemQuery } from '../impl/find-price-list-item.query';

@QueryHandler(FindPriceListItemQuery)
export class FindPriceListItemHandler
  implements IQueryHandler<FindPriceListItemQuery>
{
  constructor(
    @Inject(PriceListItemToken)
    private readonly repository: IPriceListItemRepository,
  ) {}

  async execute(query: FindPriceListItemQuery): Promise<PriceListItemView> {
    const view = await this.repository.findViewById(query.id);
    if (!view) throw new EntityNotFoundException('PriceListItem', query.id);
    return view;
  }
}
