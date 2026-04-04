import { Role, type IRoleRepository } from '@features/role/domain';
import { RoleToken } from '@features/role/infra/persistence';
import { Inject, NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindRoleQuery } from '../impl/find-role.query';

@QueryHandler(FindRoleQuery)
export class FindRoleHandler implements IQueryHandler<FindRoleQuery> {
  constructor(
    @Inject(RoleToken)
    private readonly roleRepository: IRoleRepository,
  ) {}

  async execute(query: FindRoleQuery): Promise<Role> {
    const role = await this.roleRepository.findById(query.id);
    if (!role) throw new NotFoundException('Role not found');
    return role;
  }
}
