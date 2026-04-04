import { Tenant, type ITenantRepository } from '@features/tenant/domain';
import { TenantToken } from '@features/tenant/infra/persistence';
import { Inject, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateTenantCommand } from '../impl/update-tenant.command';

@CommandHandler(UpdateTenantCommand)
export class UpdateTenantHandler implements ICommandHandler<UpdateTenantCommand> {
  constructor(
    @Inject(TenantToken)
    private readonly tenantRepository: ITenantRepository,
  ) {}

  async execute(command: UpdateTenantCommand): Promise<Tenant> {
    const existing = await this.tenantRepository.findById(command.id);
    if (!existing) {
      throw new NotFoundException('Tenant not found');
    }
    existing.name = command.name ?? existing.name;
    existing.taxIdentifier = command.taxIdentifier ?? existing.taxIdentifier;
    existing.status = command.status ?? existing.status;
    return this.tenantRepository.update(existing);
  }
}
