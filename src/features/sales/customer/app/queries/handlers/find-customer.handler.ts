import { EntityNotFoundException } from '@features/common/exceptions';
import {
  Customer,
  type ICustomerRepository,
} from '@features/sales/customer/domain';
import { CustomerToken } from '@features/sales/customer/infra/persistence';
import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindCustomerQuery } from '../impl/find-customer.query';

@QueryHandler(FindCustomerQuery)
export class FindCustomerHandler implements IQueryHandler<FindCustomerQuery> {
  constructor(
    @Inject(CustomerToken)
    private readonly customerRepository: ICustomerRepository,
  ) {}

  async execute(query: FindCustomerQuery): Promise<Customer> {
    const customer = await this.customerRepository.findById(query.id);
    if (!customer) throw new EntityNotFoundException('Customer', query.id);
    return customer;
  }
}
