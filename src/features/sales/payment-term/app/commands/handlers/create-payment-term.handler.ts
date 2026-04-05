import {
  type IPaymentTermRepository,
  PaymentTerm,
} from '@features/sales/payment-term/domain';
import { PaymentTermToken } from '@features/sales/payment-term/infra/persistence';
import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreatePaymentTermCommand } from '../impl/create-payment-term.command';

@CommandHandler(CreatePaymentTermCommand)
export class CreatePaymentTermHandler
  implements ICommandHandler<CreatePaymentTermCommand>
{
  constructor(
    @Inject(PaymentTermToken)
    private readonly repository: IPaymentTermRepository,
  ) {}

  async execute(command: CreatePaymentTermCommand): Promise<PaymentTerm> {
    const term = PaymentTerm.create(
      command.tenantId,
      command.name,
      command.days,
      command.description,
    );
    return this.repository.create(term);
  }
}
