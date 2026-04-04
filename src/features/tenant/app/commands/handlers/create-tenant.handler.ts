import { Tenant, type ITenantRepository } from '@features/tenant/domain';
import { TenantToken } from '@features/tenant/infra/persistence';
import { ConflictException, Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateTenantCommand } from '../impl/create-tenant.command';

@CommandHandler(CreateTenantCommand)
export class CreateTenantHandler
  implements ICommandHandler<CreateTenantCommand>
{
  constructor(
    @Inject(TenantToken)
    private readonly tenantRepository: ITenantRepository,
  ) {}

  async execute(command: CreateTenantCommand): Promise<Tenant> {
    const existing = await this.tenantRepository.findByTaxIdentifier(
      command.taxIdentifier,
    );
    if (existing) {
      throw new ConflictException('A tenant with this tax identifier already exists');
    }
    const tenant = Tenant.create(
      command.name,
      command.slug,
      command.taxIdentifier,
    );
    return this.tenantRepository.create(tenant);
  }
}
