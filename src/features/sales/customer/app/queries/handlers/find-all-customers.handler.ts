import { Pagination } from '@features/common/interfaces';
import {
  Customer,
  type ICustomerRepository,
} from '@features/sales/customer/domain';
import { CustomerToken } from '@features/sales/customer/infra/persistence';
import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindAllCustomersQuery } from '../impl/find-all-customers.query';

@QueryHandler(FindAllCustomersQuery)
export class FindAllCustomersHandler implements IQueryHandler<FindAllCustomersQuery> {
  constructor(
    @Inject(CustomerToken)
    private readonly customerRepository: ICustomerRepository,
  ) {}

  async execute(query: FindAllCustomersQuery): Promise<Pagination<Customer>> {
    return this.customerRepository.findAll({
      tenantId: query.tenantId,
      page: query.page,
      limit: query.limit,
      search: query.search,
    });
  }
}
