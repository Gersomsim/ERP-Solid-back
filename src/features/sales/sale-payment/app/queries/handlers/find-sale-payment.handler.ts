import { EntityNotFoundException } from '@features/common/exceptions';
import { type ISalePaymentRepository, SalePayment } from '@features/sales/sale-payment/domain';
import { SalePaymentToken } from '@features/sales/sale-payment/infra/persistence';
import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindSalePaymentQuery } from '../impl/find-sale-payment.query';

@QueryHandler(FindSalePaymentQuery)
export class FindSalePaymentHandler
  implements IQueryHandler<FindSalePaymentQuery>
{
  constructor(
    @Inject(SalePaymentToken)
    private readonly salePaymentRepository: ISalePaymentRepository,
  ) {}

  async execute(query: FindSalePaymentQuery): Promise<SalePayment> {
    const payment = await this.salePaymentRepository.findById(query.id);
    if (!payment) throw new EntityNotFoundException('SalePayment', query.id);
    return payment;
  }
}
