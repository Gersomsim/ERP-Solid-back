import { Pagination } from '@features/common/interfaces';
import { Customer } from './customer.model';

export interface ICustomerRepository {
  create(customer: Customer): Promise<Customer>;
  findById(id: string): Promise<Customer | null>;
  findAll(params: FindAllCustomersParams): Promise<Pagination<Customer>>;
  update(customer: Customer): Promise<Customer>;
  delete(id: string): Promise<void>;
}

export interface FindAllCustomersParams {
  tenantId: string;
  page?: number;
  limit?: number;
  search?: string;
}
