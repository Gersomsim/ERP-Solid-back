import { EntityNotFoundException } from '@features/common/exceptions';
import { type ICustomerRepository } from '@features/sales/customer/domain';
import { CustomerToken } from '@features/sales/customer/infra/persistence';
import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteCustomerCommand } from '../impl/delete-customer.command';

@CommandHandler(DeleteCustomerCommand)
export class DeleteCustomerHandler implements ICommandHandler<DeleteCustomerCommand> {
  constructor(
    @Inject(CustomerToken)
    private readonly customerRepository: ICustomerRepository,
  ) {}

  async execute(command: DeleteCustomerCommand): Promise<void> {
    const customer = await this.customerRepository.findById(command.id);
    if (!customer) throw new EntityNotFoundException('Customer', command.id);
    await this.customerRepository.delete(command.id);
  }
}
