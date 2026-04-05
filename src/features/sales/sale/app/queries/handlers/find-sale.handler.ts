import { EntityNotFoundException } from '@features/common/exceptions';
import { type ISaleRepository, Sale } from '@features/sales/sale/domain';
import { SaleToken } from '@features/sales/sale/infra/persistence';
import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindSaleQuery } from '../impl/find-sale.query';

@QueryHandler(FindSaleQuery)
export class FindSaleHandler implements IQueryHandler<FindSaleQuery> {
  constructor(
    @Inject(SaleToken)
    private readonly saleRepository: ISaleRepository,
  ) {}

  async execute(query: FindSaleQuery): Promise<Sale> {
    const sale = await this.saleRepository.findById(query.id);
    if (!sale) throw new EntityNotFoundException('Sale', query.id);
    return sale;
  }
}
