import { EntityNotFoundException } from '@features/common/exceptions';
import {
  type IPaymentTermRepository,
  PaymentTerm,
} from '@features/sales/payment-term/domain';
import { PaymentTermToken } from '@features/sales/payment-term/infra/persistence';
import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdatePaymentTermCommand } from '../impl/update-payment-term.command';

@CommandHandler(UpdatePaymentTermCommand)
export class UpdatePaymentTermHandler
  implements ICommandHandler<UpdatePaymentTermCommand>
{
  constructor(
    @Inject(PaymentTermToken)
    private readonly repository: IPaymentTermRepository,
  ) {}

  async execute(command: UpdatePaymentTermCommand): Promise<PaymentTerm> {
    const term = await this.repository.findById(command.id);
    if (!term) throw new EntityNotFoundException('PaymentTerm', command.id);

    if (command.name !== undefined) term.name = command.name;
    if (command.days !== undefined) term.days = command.days;
    if (command.description !== undefined) term.description = command.description;
    if (command.isActive !== undefined) term.isActive = command.isActive;

    return this.repository.update(term);
  }
}
