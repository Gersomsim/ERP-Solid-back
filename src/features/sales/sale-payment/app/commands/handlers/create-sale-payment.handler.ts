import { type ISalePaymentRepository, SalePayment } from '@features/sales/sale-payment/domain';
import { SalePaymentToken } from '@features/sales/sale-payment/infra/persistence';
import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateSalePaymentCommand } from '../impl/create-sale-payment.command';

@CommandHandler(CreateSalePaymentCommand)
export class CreateSalePaymentHandler
  implements ICommandHandler<CreateSalePaymentCommand>
{
  constructor(
    @Inject(SalePaymentToken)
    private readonly salePaymentRepository: ISalePaymentRepository,
  ) {}

  async execute(command: CreateSalePaymentCommand): Promise<SalePayment> {
    const payment = SalePayment.create(
      command.saleId,
      command.amount,
      command.date,
      command.reference,
      command.paymentMethodId,
    );
    return this.salePaymentRepository.create(payment);
  }
}
