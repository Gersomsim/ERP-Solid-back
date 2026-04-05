import { EntityNotFoundException } from '@features/common/exceptions';
import {
  type ISaleAgentRepository,
  SaleAgent,
} from '@features/sales/sale-agent/domain';
import { SaleAgentToken } from '@features/sales/sale-agent/infra/persistence';
import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateSaleAgentCommand } from '../impl/update-sale-agent.command';

@CommandHandler(UpdateSaleAgentCommand)
export class UpdateSaleAgentHandler implements ICommandHandler<UpdateSaleAgentCommand> {
  constructor(
    @Inject(SaleAgentToken)
    private readonly saleAgentRepository: ISaleAgentRepository,
  ) {}

  async execute(command: UpdateSaleAgentCommand): Promise<SaleAgent> {
    const agent = await this.saleAgentRepository.findById(command.id);
    if (!agent) throw new EntityNotFoundException('SaleAgent', command.id);

    if (command.name !== undefined) agent.name = command.name;
    if (command.commissionRate !== undefined)
      agent.commissionRate = command.commissionRate;
    if (command.userId !== undefined) agent.userId = command.userId;

    return this.saleAgentRepository.update(agent);
  }
}
