import { EntityNotFoundException } from '@features/common/exceptions';
import {
  type IPriceListRepository,
  PriceList,
} from '@features/sales/price-list/domain';
import { PriceListToken } from '@features/sales/price-list/infra/persistence';
import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindPriceListQuery } from '../impl/find-price-list.query';

@QueryHandler(FindPriceListQuery)
export class FindPriceListHandler implements IQueryHandler<FindPriceListQuery> {
  constructor(
    @Inject(PriceListToken)
    private readonly repository: IPriceListRepository,
  ) {}

  async execute(query: FindPriceListQuery): Promise<PriceList> {
    const priceList = await this.repository.findById(query.id);
    if (!priceList) throw new EntityNotFoundException('PriceList', query.id);
    return priceList;
  }
}
