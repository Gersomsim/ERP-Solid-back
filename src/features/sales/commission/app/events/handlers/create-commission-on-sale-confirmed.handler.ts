import { type ICommissionRuleRepository } from '@features/sales/commission-rule/domain';
import { CommissionRuleToken } from '@features/sales/commission-rule/infra/persistence';
import { Commission, type ICommissionRepository } from '@features/sales/commission/domain';
import { CommissionToken } from '@features/sales/commission/infra/persistence';
import { SaleConfirmedEvent } from '@features/sales/sale/domain/events';
import { Inject, Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(SaleConfirmedEvent)
export class CreateCommissionOnSaleConfirmedHandler
  implements IEventHandler<SaleConfirmedEvent>
{
  private readonly logger = new Logger(CreateCommissionOnSaleConfirmedHandler.name);

  constructor(
    @Inject(CommissionToken)
    private readonly commissionRepository: ICommissionRepository,
    @Inject(CommissionRuleToken)
    private readonly commissionRuleRepository: ICommissionRuleRepository,
  ) {}

  async handle(event: SaleConfirmedEvent): Promise<void> {
    const rule = await this.commissionRuleRepository.findActiveByAgentId(
      event.saleAgentId,
      event.tenantId,
    );

    if (!rule) {
      this.logger.warn(
        `No active commission rule for agent ${event.saleAgentId} — skipping commission creation`,
      );
      return;
    }

    const commission = Commission.create(
      event.saleId,
      event.saleAgentId,
      event.tenantId,
      event.total,
      rule.percentage,
    );

    await this.commissionRepository.create(commission);
  }
}
