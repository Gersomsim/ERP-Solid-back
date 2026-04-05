import { Provider } from '@nestjs/common';
import { TypeOrmCustomerRepository } from './typeorm-customer.repository';

export const CustomerToken = 'CUSTOMER_TOKEN';

export const CustomerProvider: Provider = {
  provide: CustomerToken,
  useClass: TypeOrmCustomerRepository,
};
