import { EntityNotFoundException } from '@features/common/exceptions';
import { type ISaleAgentRepository } from '@features/sales/sale-agent/domain';
import { SaleAgentToken } from '@features/sales/sale-agent/infra/persistence';
import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteSaleAgentCommand } from '../impl/delete-sale-agent.command';

@CommandHandler(DeleteSaleAgentCommand)
export class DeleteSaleAgentHandler implements ICommandHandler<DeleteSaleAgentCommand> {
  constructor(
    @Inject(SaleAgentToken)
    private readonly saleAgentRepository: ISaleAgentRepository,
  ) {}

  async execute(command: DeleteSaleAgentCommand): Promise<void> {
    const agent = await this.saleAgentRepository.findById(command.id);
    if (!agent) throw new EntityNotFoundException('SaleAgent', command.id);
    await this.saleAgentRepository.delete(command.id);
  }
}
