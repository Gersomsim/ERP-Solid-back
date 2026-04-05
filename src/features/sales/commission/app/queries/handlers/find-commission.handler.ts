import { EntityNotFoundException } from '@features/common/exceptions';
import {
  Commission,
  type ICommissionRepository,
} from '@features/sales/commission/domain';
import { CommissionToken } from '@features/sales/commission/infra/persistence';
import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindCommissionQuery } from '../impl/find-commission.query';

@QueryHandler(FindCommissionQuery)
export class FindCommissionHandler
  implements IQueryHandler<FindCommissionQuery>
{
  constructor(
    @Inject(CommissionToken)
    private readonly repository: ICommissionRepository,
  ) {}

  async execute(query: FindCommissionQuery): Promise<Commission> {
    const commission = await this.repository.findById(query.id);
    if (!commission)
      throw new EntityNotFoundException('Commission', query.id);
    return commission;
  }
}
