import {
  CreateCustomerHandler,
  DeleteCustomerHandler,
  UpdateCustomerHandler,
} from '@features/sales/customer/app/commands';
import {
  FindAllCustomersHandler,
  FindCustomerHandler,
} from '@features/sales/customer/app/queries';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerController } from './http/customer.controller';
import { CustomerEntity, CustomerProvider } from './persistence';

@Module({
  imports: [TypeOrmModule.forFeature([CustomerEntity]), CqrsModule],
  controllers: [CustomerController],
  providers: [
    CustomerProvider,
    CreateCustomerHandler,
    UpdateCustomerHandler,
    DeleteCustomerHandler,
    FindAllCustomersHandler,
    FindCustomerHandler,
  ],
})
export class CustomerModule {}
