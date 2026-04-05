import { EntityNotFoundException } from '@features/common/exceptions';
import { type ISalePaymentRepository, SalePayment } from '@features/sales/sale-payment/domain';
import { SalePaymentToken } from '@features/sales/sale-payment/infra/persistence';
import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateSalePaymentCommand } from '../impl/update-sale-payment.command';

@CommandHandler(UpdateSalePaymentCommand)
export class UpdateSalePaymentHandler
  implements ICommandHandler<UpdateSalePaymentCommand>
{
  constructor(
    @Inject(SalePaymentToken)
    private readonly salePaymentRepository: ISalePaymentRepository,
  ) {}

  async execute(command: UpdateSalePaymentCommand): Promise<SalePayment> {
    const payment = await this.salePaymentRepository.findById(command.id);
    if (!payment) throw new EntityNotFoundException('SalePayment', command.id);

    if (command.amount !== undefined) payment.amount = command.amount;
    if (command.date !== undefined) payment.date = command.date;
    if (command.reference !== undefined) payment.reference = command.reference;
    if (command.paymentMethodId !== undefined)
      payment.paymentMethodId = command.paymentMethodId;

    return this.salePaymentRepository.update(payment);
  }
}
