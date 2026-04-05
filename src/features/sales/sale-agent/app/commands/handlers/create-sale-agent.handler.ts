import { SaleAgent, ISaleAgentRepository } from '@features/sales/sale-agent/domain';
import { SaleAgentToken } from '@features/sales/sale-agent/infra/persistence';
import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateSaleAgentCommand } from '../impl/create-sale-agent.command';

@CommandHandler(CreateSaleAgentCommand)
export class CreateSaleAgentHandler
  implements ICommandHandler<CreateSaleAgentCommand>
{
  constructor(
    @Inject(SaleAgentToken)
    private readonly saleAgentRepository: ISaleAgentRepository,
  ) {}

  async execute(command: CreateSaleAgentCommand): Promise<SaleAgent> {
    const agent = SaleAgent.create(
      command.name,
      command.tenantId,
      command.commissionRate,
      command.userId,
    );
    return this.saleAgentRepository.create(agent);
  }
}
