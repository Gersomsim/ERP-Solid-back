import { EntityNotFoundException } from '@features/common/exceptions';
import {
  CommissionPayment,
  CommissionPaymentStatus,
  type ICommissionPaymentRepository,
} from '@features/sales/commission-payment/domain';
import { CommissionPaymentToken } from '@features/sales/commission-payment/infra/persistence';
import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { PayCommissionPaymentCommand } from '../impl/pay-commission-payment.command';

@CommandHandler(PayCommissionPaymentCommand)
export class PayCommissionPaymentHandler
  implements ICommandHandler<PayCommissionPaymentCommand>
{
  constructor(
    @Inject(CommissionPaymentToken)
    private readonly repository: ICommissionPaymentRepository,
  ) {}

  async execute(command: PayCommissionPaymentCommand): Promise<CommissionPayment> {
    const payment = await this.repository.findById(command.id);
    if (!payment)
      throw new EntityNotFoundException('CommissionPayment', command.id);
    payment.status = CommissionPaymentStatus.PAID;
    return this.repository.update(payment);
  }
}
