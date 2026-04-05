import { EntityNotFoundException } from '@features/common/exceptions';
import { type ISaleTargetRepository } from '@features/sales/sale-target/domain';
import { SaleTargetToken } from '@features/sales/sale-target/infra/persistence';
import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteSaleTargetCommand } from '../impl/delete-sale-target.command';

@CommandHandler(DeleteSaleTargetCommand)
export class DeleteSaleTargetHandler
  implements ICommandHandler<DeleteSaleTargetCommand>
{
  constructor(
    @Inject(SaleTargetToken)
    private readonly repository: ISaleTargetRepository,
  ) {}

  async execute(command: DeleteSaleTargetCommand): Promise<void> {
    const target = await this.repository.findById(command.id);
    if (!target) throw new EntityNotFoundException('SaleTarget', command.id);
    await this.repository.delete(command.id);
  }
}
