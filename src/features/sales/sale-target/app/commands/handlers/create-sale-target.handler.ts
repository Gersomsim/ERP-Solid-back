import {
  type ISaleTargetRepository,
  SaleTarget,
} from '@features/sales/sale-target/domain';
import { SaleTargetToken } from '@features/sales/sale-target/infra/persistence';
import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateSaleTargetCommand } from '../impl/create-sale-target.command';

@CommandHandler(CreateSaleTargetCommand)
export class CreateSaleTargetHandler
  implements ICommandHandler<CreateSaleTargetCommand>
{
  constructor(
    @Inject(SaleTargetToken)
    private readonly repository: ISaleTargetRepository,
  ) {}

  async execute(command: CreateSaleTargetCommand): Promise<SaleTarget> {
    const target = SaleTarget.create(
      command.agentId,
      command.tenantId,
      command.periodFrom,
      command.periodTo,
      command.targetAmount,
    );
    return this.repository.create(target);
  }
}
