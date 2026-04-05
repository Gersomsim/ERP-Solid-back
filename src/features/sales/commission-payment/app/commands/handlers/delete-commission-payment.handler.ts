import { EntityNotFoundException } from '@features/common/exceptions';
import { type ICommissionPaymentRepository } from '@features/sales/commission-payment/domain';
import { CommissionPaymentToken } from '@features/sales/commission-payment/infra/persistence';
import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteCommissionPaymentCommand } from '../impl/delete-commission-payment.command';

@CommandHandler(DeleteCommissionPaymentCommand)
export class DeleteCommissionPaymentHandler
  implements ICommandHandler<DeleteCommissionPaymentCommand>
{
  constructor(
    @Inject(CommissionPaymentToken)
    private readonly repository: ICommissionPaymentRepository,
  ) {}

  async execute(command: DeleteCommissionPaymentCommand): Promise<void> {
    const payment = await this.repository.findById(command.id);
    if (!payment)
      throw new EntityNotFoundException('CommissionPayment', command.id);
    await this.repository.delete(command.id);
  }
}
