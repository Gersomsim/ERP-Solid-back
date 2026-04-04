import { Role, type IRoleRepository } from '@features/role/domain';
import { RoleToken } from '@features/role/infra/persistence';
import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindAllRolesQuery } from '../impl/find-all-roles.query';

@QueryHandler(FindAllRolesQuery)
export class FindAllRolesHandler implements IQueryHandler<FindAllRolesQuery> {
  constructor(
    @Inject(RoleToken)
    private readonly roleRepository: IRoleRepository,
  ) {}

  async execute(query: FindAllRolesQuery): Promise<Role[]> {
    return this.roleRepository.findAll(query.tenantId);
  }
}
