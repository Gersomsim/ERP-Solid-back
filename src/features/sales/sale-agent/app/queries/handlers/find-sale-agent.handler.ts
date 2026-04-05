import { EntityNotFoundException } from '@features/common/exceptions';
import { ISaleAgentRepository, SaleAgent } from '@features/sales/sale-agent/domain';
import { SaleAgentToken } from '@features/sales/sale-agent/infra/persistence';
import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindSaleAgentQuery } from '../impl/find-sale-agent.query';

@QueryHandler(FindSaleAgentQuery)
export class FindSaleAgentHandler implements IQueryHandler<FindSaleAgentQuery> {
  constructor(
    @Inject(SaleAgentToken)
    private readonly saleAgentRepository: ISaleAgentRepository,
  ) {}

  async execute(query: FindSaleAgentQuery): Promise<SaleAgent> {
    const agent = await this.saleAgentRepository.findById(query.id);
    if (!agent) throw new EntityNotFoundException('SaleAgent', query.id);
    return agent;
  }
}
