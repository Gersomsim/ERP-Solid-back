import { EntityNotFoundException } from '@features/common/exceptions';
import { Pagination } from '@features/common/interfaces';
import { setPagination } from '@features/common/utils';
import {
  Customer,
  FindAllCustomersParams,
  ICustomerRepository,
} from '@features/sales/customer/domain';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, ILike, Repository } from 'typeorm';
import { CustomerEntity } from './customer.entity';

@Injectable()
export class TypeOrmCustomerRepository implements ICustomerRepository {
  constructor(
    @InjectRepository(CustomerEntity)
    private readonly repository: Repository<CustomerEntity>,
  ) {}

  async create(customer: Customer): Promise<Customer> {
    const entity = this.repository.create({
      name: customer.name,
      taxId: customer.taxId,
      tenantId: customer.tenantId,
      creditLimit: customer.creditLimit,
      email: customer.email,
      phone: customer.phone,
      address: customer.address,
      city: customer.city,
      state: customer.state,
      zip: customer.zip,
      country: customer.country,
    });
    const saved = await this.repository.save(entity);
    return this.toDomain(saved);
  }

  async findById(id: string): Promise<Customer | null> {
    const entity = await this.repository.findOne({ where: { id } });
    return entity ? this.toDomain(entity) : null;
  }

  async findAll(params: FindAllCustomersParams): Promise<Pagination<Customer>> {
    const { tenantId, page = 1, limit = 10, search } = params;
    const where: FindOptionsWhere<CustomerEntity> = { tenantId };

    if (search) {
      where.name = ILike(`%${search}%`);
      where.taxId = ILike(`%${search}%`);
    }

    const [items, totalItems] = await this.repository.findAndCount({
      where,
      skip: (page - 1) * limit,
      take: limit,
      order: { createdAt: 'DESC' },
    });

    return {
      data: items.map((item) => this.toDomain(item)),
      pagination: setPagination(totalItems, limit, page, items.length),
    };
  }

  async update(customer: Customer): Promise<Customer> {
    const entity = await this.repository.findOne({
      where: { id: customer.id },
    });
    if (!entity) throw new EntityNotFoundException('Customer', customer.id);

    entity.name = customer.name;
    entity.taxId = customer.taxId;
    entity.creditLimit = customer.creditLimit;
    entity.email = customer.email;
    entity.phone = customer.phone;
    entity.address = customer.address;
    entity.city = customer.city;
    entity.state = customer.state;
    entity.zip = customer.zip;
    entity.country = customer.country;

    const saved = await this.repository.save(entity);
    return this.toDomain(saved);
  }

  async delete(id: string): Promise<void> {
    const entity = await this.repository.findOne({ where: { id } });
    if (!entity) throw new EntityNotFoundException('Customer', id);
    await this.repository.softRemove(entity);
  }

  private toDomain(entity: CustomerEntity): Customer {
    const customer = new Customer();
    customer.id = entity.id;
    customer.name = entity.name;
    customer.taxId = entity.taxId;
    customer.tenantId = entity.tenantId;
    customer.creditLimit = Number(entity.creditLimit);
    customer.email = entity.email;
    customer.phone = entity.phone;
    customer.address = entity.address;
    customer.city = entity.city;
    customer.state = entity.state;
    customer.zip = entity.zip;
    customer.country = entity.country;
    return customer;
  }
}
