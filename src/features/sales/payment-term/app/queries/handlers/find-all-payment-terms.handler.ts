import { Pagination } from '@features/common/interfaces';
import {
  type IPaymentTermRepository,
  PaymentTerm,
} from '@features/sales/payment-term/domain';
import { PaymentTermToken } from '@features/sales/payment-term/infra/persistence';
import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindAllPaymentTermsQuery } from '../impl/find-all-payment-terms.query';

@QueryHandler(FindAllPaymentTermsQuery)
export class FindAllPaymentTermsHandler
  implements IQueryHandler<FindAllPaymentTermsQuery>
{
  constructor(
    @Inject(PaymentTermToken)
    private readonly repository: IPaymentTermRepository,
  ) {}

  async execute(
    query: FindAllPaymentTermsQuery,
  ): Promise<Pagination<PaymentTerm>> {
    return this.repository.findAll({
      tenantId: query.tenantId,
      page: query.page,
      limit: query.limit,
      search: query.search,
    });
  }
}
