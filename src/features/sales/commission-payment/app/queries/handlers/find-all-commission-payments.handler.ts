import { Pagination } from '@features/common/interfaces';
import {
  CommissionPayment,
  type ICommissionPaymentRepository,
} from '@features/sales/commission-payment/domain';
import { CommissionPaymentToken } from '@features/sales/commission-payment/infra/persistence';
import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindAllCommissionPaymentsQuery } from '../impl/find-all-commission-payments.query';

@QueryHandler(FindAllCommissionPaymentsQuery)
export class FindAllCommissionPaymentsHandler
  implements IQueryHandler<FindAllCommissionPaymentsQuery>
{
  constructor(
    @Inject(CommissionPaymentToken)
    private readonly repository: ICommissionPaymentRepository,
  ) {}

  async execute(
    query: FindAllCommissionPaymentsQuery,
  ): Promise<Pagination<CommissionPayment>> {
    return this.repository.findAll({
      tenantId: query.tenantId,
      page: query.page,
      limit: query.limit,
      agentId: query.agentId,
    });
  }
}
