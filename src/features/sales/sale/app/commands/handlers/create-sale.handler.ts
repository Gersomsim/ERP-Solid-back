import { type ISaleRepository, Sale } from '@features/sales/sale/domain';
import { SaleToken } from '@features/sales/sale/infra/persistence';
import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateSaleCommand } from '../impl/create-sale.command';

@CommandHandler(CreateSaleCommand)
export class CreateSaleHandler implements ICommandHandler<CreateSaleCommand> {
  constructor(
    @Inject(SaleToken)
    private readonly saleRepository: ISaleRepository,
  ) {}

  async execute(command: CreateSaleCommand): Promise<Sale> {
    const sale = Sale.create(
      command.tenantId,
      command.customerId,
      command.saleAgentId,
      command.folio,
      command.saleDate,
      command.subtotal,
      command.tax,
      command.discount,
      command.total,
      command.paymentTermId,
    );
    return this.saleRepository.create(sale);
  }
}
