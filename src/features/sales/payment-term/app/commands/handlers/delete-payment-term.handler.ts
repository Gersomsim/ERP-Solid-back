import { EntityNotFoundException } from '@features/common/exceptions';
import { type IPaymentTermRepository } from '@features/sales/payment-term/domain';
import { PaymentTermToken } from '@features/sales/payment-term/infra/persistence';
import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeletePaymentTermCommand } from '../impl/delete-payment-term.command';

@CommandHandler(DeletePaymentTermCommand)
export class DeletePaymentTermHandler
  implements ICommandHandler<DeletePaymentTermCommand>
{
  constructor(
    @Inject(PaymentTermToken)
    private readonly repository: IPaymentTermRepository,
  ) {}

  async execute(command: DeletePaymentTermCommand): Promise<void> {
    const term = await this.repository.findById(command.id);
    if (!term) throw new EntityNotFoundException('PaymentTerm', command.id);
    await this.repository.delete(command.id);
  }
}
