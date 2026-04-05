import { EntityNotFoundException } from '@features/common/exceptions';
import { type ISaleRepository, Sale } from '@features/sales/sale/domain';
import { SaleToken } from '@features/sales/sale/infra/persistence';
import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateSaleCommand } from '../impl/update-sale.command';

@CommandHandler(UpdateSaleCommand)
export class UpdateSaleHandler implements ICommandHandler<UpdateSaleCommand> {
  constructor(
    @Inject(SaleToken)
    private readonly saleRepository: ISaleRepository,
  ) {}

  async execute(command: UpdateSaleCommand): Promise<Sale> {
    const sale = await this.saleRepository.findById(command.id);
    if (!sale) throw new EntityNotFoundException('Sale', command.id);

    if (command.customerId !== undefined) sale.customerId = command.customerId;
    if (command.saleAgentId !== undefined)
      sale.saleAgentId = command.saleAgentId;
    if (command.folio !== undefined) sale.folio = command.folio;
    if (command.saleDate !== undefined) sale.saleDate = command.saleDate;
    if (command.subtotal !== undefined) sale.subtotal = command.subtotal;
    if (command.tax !== undefined) sale.tax = command.tax;
    if (command.discount !== undefined) sale.discount = command.discount;
    if (command.total !== undefined) sale.total = command.total;
    if (command.status !== undefined) sale.status = command.status;
    if (command.paymentTermId !== undefined) sale.paymentTermId = command.paymentTermId;

    return this.saleRepository.update(sale);
  }
}
