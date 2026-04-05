import { Pagination } from '@features/common/interfaces';
import { type ISalePaymentRepository, SalePayment } from '@features/sales/sale-payment/domain';
import { SalePaymentToken } from '@features/sales/sale-payment/infra/persistence';
import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindAllSalePaymentsQuery } from '../impl/find-all-sale-payments.query';

@QueryHandler(FindAllSalePaymentsQuery)
export class FindAllSalePaymentsHandler
  implements IQueryHandler<FindAllSalePaymentsQuery>
{
  constructor(
    @Inject(SalePaymentToken)
    private readonly salePaymentRepository: ISalePaymentRepository,
  ) {}

  async execute(
    query: FindAllSalePaymentsQuery,
  ): Promise<Pagination<SalePayment>> {
    return this.salePaymentRepository.findAll({
      saleId: query.saleId,
      page: query.page,
      limit: query.limit,
    });
  }
}
