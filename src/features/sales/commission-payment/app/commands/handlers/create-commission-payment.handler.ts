import { type ICommissionRepository, CommissionStatus } from '@features/sales/commission/domain';
import { CommissionToken } from '@features/sales/commission/infra/persistence';
import {
  CommissionPayment,
  type ICommissionPaymentRepository,
} from '@features/sales/commission-payment/domain';
import { CommissionPaymentToken } from '@features/sales/commission-payment/infra/persistence';
import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateCommissionPaymentCommand } from '../impl/create-commission-payment.command';

@CommandHandler(CreateCommissionPaymentCommand)
export class CreateCommissionPaymentHandler
  implements ICommandHandler<CreateCommissionPaymentCommand>
{
  constructor(
    @Inject(CommissionPaymentToken)
    private readonly paymentRepository: ICommissionPaymentRepository,
    @Inject(CommissionToken)
    private readonly commissionRepository: ICommissionRepository,
  ) {}

  async execute(
    command: CreateCommissionPaymentCommand,
  ): Promise<CommissionPayment> {
    const approved = await this.commissionRepository.findApprovedByAgentId(
      command.agentId,
      command.tenantId,
    );

    const totalAmount = approved.reduce((sum, c) => sum + c.amount, 0);

    const payment = CommissionPayment.create(
      command.agentId,
      command.tenantId,
      command.periodFrom,
      command.periodTo,
      totalAmount,
    );

    const saved = await this.paymentRepository.create(payment);

    // Link commissions to this payment
    await Promise.all(
      approved.map((commission) => {
        commission.commissionPaymentId = saved.id;
        commission.status = CommissionStatus.PAID;
        return this.commissionRepository.update(commission);
      }),
    );

    return saved;
  }
}
