import {
  Customer,
  type ICustomerRepository,
} from '@features/sales/customer/domain';
import { CustomerToken } from '@features/sales/customer/infra/persistence';
import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateCustomerCommand } from '../impl/create-customer.command';

@CommandHandler(CreateCustomerCommand)
export class CreateCustomerHandler implements ICommandHandler<CreateCustomerCommand> {
  constructor(
    @Inject(CustomerToken)
    private readonly customerRepository: ICustomerRepository,
  ) {}

  async execute(command: CreateCustomerCommand): Promise<Customer> {
    const customer = Customer.create(
      command.name,
      command.taxId,
      command.tenantId,
      command.creditLimit,
      command.email,
      command.phone,
      command.address,
      command.city,
      command.state,
      command.zip,
      command.country,
    );
    return this.customerRepository.create(customer);
  }
}
