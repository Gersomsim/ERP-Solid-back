import { EntityNotFoundException } from '@features/common/exceptions';
import {
  type ISaleRepository,
  Sale,
  SaleStatus,
} from '@features/sales/sale/domain';
import { SaleConfirmedEvent } from '@features/sales/sale/domain/events';
import { SaleToken } from '@features/sales/sale/infra/persistence';
import { Inject } from '@nestjs/common';
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { ConfirmSaleCommand } from '../impl/confirm-sale.command';

@CommandHandler(ConfirmSaleCommand)
export class ConfirmSaleHandler implements ICommandHandler<ConfirmSaleCommand> {
  constructor(
    @Inject(SaleToken)
    private readonly saleRepository: ISaleRepository,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: ConfirmSaleCommand): Promise<Sale> {
    const sale = await this.saleRepository.findById(command.id);
    if (!sale) throw new EntityNotFoundException('Sale', command.id);

    sale.status = SaleStatus.CONFIRMED;
    const confirmed = await this.saleRepository.update(sale);

    this.eventBus.publish(
      new SaleConfirmedEvent(
        confirmed.id,
        confirmed.saleAgentId,
        confirmed.tenantId,
        confirmed.total,
      ),
    );

    return confirmed;
  }
}
