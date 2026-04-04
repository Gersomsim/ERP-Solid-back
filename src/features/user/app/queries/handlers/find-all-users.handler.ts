import { Pagination } from '@features/common/interfaces';
import type { IUserRepository } from '@features/user/domain';
import { User } from '@features/user/domain';
import { UserToken } from '@features/user/infra/persistence';
import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindAllUsersQuery } from '../impl/find-all-users.query';

@QueryHandler(FindAllUsersQuery)
export class FindAllUsersHandler implements IQueryHandler<FindAllUsersQuery> {
  constructor(
    @Inject(UserToken)
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(query: FindAllUsersQuery): Promise<Pagination<User>> {
    const { tenantId, page, limit, search, isActive } = query;
    const res = await this.userRepository.findAll({
      tenantId,
      page,
      limit,
      search,
      isActive,
    });
    return res;
  }
}
