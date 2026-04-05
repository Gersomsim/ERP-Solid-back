import {
  type ISaleReturnRepository,
  SaleReturn,
} from '@features/sales/sale-return/domain';
import { SaleReturnToken } from '@features/sales/sale-return/infra/persistence';
import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateSaleReturnCommand } from '../impl/create-sale-return.command';

@CommandHandler(CreateSaleReturnCommand)
export class CreateSaleReturnHandler
  implements ICommandHandler<CreateSaleReturnCommand>
{
  constructor(
    @Inject(SaleReturnToken)
    private readonly repository: ISaleReturnRepository,
  ) {}

  async execute(command: CreateSaleReturnCommand): Promise<SaleReturn> {
    const saleReturn = SaleReturn.create(
      command.saleId,
      command.tenantId,
      command.reason,
      command.resolutionType,
      command.notes,
    );
    return this.repository.create(saleReturn);
  }
}
