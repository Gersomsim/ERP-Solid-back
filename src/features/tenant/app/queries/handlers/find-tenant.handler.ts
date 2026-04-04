import { Tenant, type ITenantRepository } from '@features/tenant/domain';
import { TenantToken } from '@features/tenant/infra/persistence';
import { Inject, NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindTenantQuery } from '../impl/find-tenant.query';

@QueryHandler(FindTenantQuery)
export class FindTenantHandler implements IQueryHandler<FindTenantQuery> {
  constructor(
    @Inject(TenantToken)
    private readonly tenantRepository: ITenantRepository,
  ) {}

  async execute(query: FindTenantQuery): Promise<Tenant> {
    const tenant = await this.tenantRepository.findById(query.id);
    if (!tenant) {
      throw new NotFoundException('Tenant not found');
    }
    return tenant;
  }
}
