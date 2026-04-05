import { EntityNotFoundException } from '@features/common/exceptions';
import {
  type IPaymentTermRepository,
  PaymentTerm,
} from '@features/sales/payment-term/domain';
import { PaymentTermToken } from '@features/sales/payment-term/infra/persistence';
import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindPaymentTermQuery } from '../impl/find-payment-term.query';

@QueryHandler(FindPaymentTermQuery)
export class FindPaymentTermHandler
  implements IQueryHandler<FindPaymentTermQuery>
{
  constructor(
    @Inject(PaymentTermToken)
    private readonly repository: IPaymentTermRepository,
  ) {}

  async execute(query: FindPaymentTermQuery): Promise<PaymentTerm> {
    const term = await this.repository.findById(query.id);
    if (!term) throw new EntityNotFoundException('PaymentTerm', query.id);
    return term;
  }
}
