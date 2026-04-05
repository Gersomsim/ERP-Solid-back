import { EntityNotFoundException } from '@features/common/exceptions';
import {
  CommissionPayment,
  type ICommissionPaymentRepository,
} from '@features/sales/commission-payment/domain';
import { CommissionPaymentToken } from '@features/sales/commission-payment/infra/persistence';
import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindCommissionPaymentQuery } from '../impl/find-commission-payment.query';

@QueryHandler(FindCommissionPaymentQuery)
export class FindCommissionPaymentHandler
  implements IQueryHandler<FindCommissionPaymentQuery>
{
  constructor(
    @Inject(CommissionPaymentToken)
    private readonly repository: ICommissionPaymentRepository,
  ) {}

  async execute(query: FindCommissionPaymentQuery): Promise<CommissionPayment> {
    const payment = await this.repository.findById(query.id);
    if (!payment)
      throw new EntityNotFoundException('CommissionPayment', query.id);
    return payment;
  }
}
