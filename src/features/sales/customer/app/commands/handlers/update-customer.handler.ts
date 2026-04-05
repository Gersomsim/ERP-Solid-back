import { EntityNotFoundException } from '@features/common/exceptions';
import {
  Customer,
  type ICustomerRepository,
} from '@features/sales/customer/domain';
import { CustomerToken } from '@features/sales/customer/infra/persistence';
import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateCustomerCommand } from '../impl/update-customer.command';

@CommandHandler(UpdateCustomerCommand)
export class UpdateCustomerHandler implements ICommandHandler<UpdateCustomerCommand> {
  constructor(
    @Inject(CustomerToken)
    private readonly customerRepository: ICustomerRepository,
  ) {}

  async execute(command: UpdateCustomerCommand): Promise<Customer> {
    const customer = await this.customerRepository.findById(command.id);
    if (!customer) throw new EntityNotFoundException('Customer', command.id);

    if (command.name !== undefined) customer.name = command.name;
    if (command.taxId !== undefined) customer.taxId = command.taxId;
    if (command.creditLimit !== undefined)
      customer.creditLimit = command.creditLimit;
    if (command.email !== undefined) customer.email = command.email;
    if (command.phone !== undefined) customer.phone = command.phone;
    if (command.address !== undefined) customer.address = command.address;
    if (command.city !== undefined) customer.city = command.city;
    if (command.state !== undefined) customer.state = command.state;
    if (command.zip !== undefined) customer.zip = command.zip;
    if (command.country !== undefined) customer.country = command.country;

    return this.customerRepository.update(customer);
  }
}
