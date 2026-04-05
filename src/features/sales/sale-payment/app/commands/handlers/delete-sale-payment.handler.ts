import { EntityNotFoundException } from '@features/common/exceptions';
import { type ISalePaymentRepository } from '@features/sales/sale-payment/domain';
import { SalePaymentToken } from '@features/sales/sale-payment/infra/persistence';
import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteSalePaymentCommand } from '../impl/delete-sale-payment.command';

@CommandHandler(DeleteSalePaymentCommand)
export class DeleteSalePaymentHandler
  implements ICommandHandler<DeleteSalePaymentCommand>
{
  constructor(
    @Inject(SalePaymentToken)
    private readonly salePaymentRepository: ISalePaymentRepository,
  ) {}

  async execute(command: DeleteSalePaymentCommand): Promise<void> {
    const payment = await this.salePaymentRepository.findById(command.id);
    if (!payment) throw new EntityNotFoundException('SalePayment', command.id);
    await this.salePaymentRepository.delete(command.id);
  }
}
