import { Tenant, type ITenantRepository } from '@features/tenant/domain';
import { TenantToken } from '@features/tenant/infra/persistence';
import { Inject, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateTenantSettingsCommand } from '../impl/update-tenant-settings.command';

@CommandHandler(UpdateTenantSettingsCommand)
export class UpdateTenantSettingsHandler
  implements ICommandHandler<UpdateTenantSettingsCommand>
{
  constructor(
    @Inject(TenantToken)
    private readonly tenantRepository: ITenantRepository,
  ) {}

  async execute(command: UpdateTenantSettingsCommand): Promise<Tenant> {
    const existing = await this.tenantRepository.findById(command.id);
    if (!existing) {
      throw new NotFoundException('Tenant not found');
    }
    return this.tenantRepository.updateSettings(command.id, command.settings);
  }
}
