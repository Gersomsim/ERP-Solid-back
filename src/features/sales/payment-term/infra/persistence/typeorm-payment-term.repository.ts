import { EntityNotFoundException } from '@features/common/exceptions';
import { Pagination } from '@features/common/interfaces';
import { setPagination } from '@features/common/utils';
import {
  FindAllPaymentTermsParams,
  IPaymentTermRepository,
  PaymentTerm,
} from '@features/sales/payment-term/domain';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaymentTermEntity } from './payment-term.entity';

@Injectable()
export class TypeOrmPaymentTermRepository implements IPaymentTermRepository {
  constructor(
    @InjectRepository(PaymentTermEntity)
    private readonly repository: Repository<PaymentTermEntity>,
  ) {}

  async create(term: PaymentTerm): Promise<PaymentTerm> {
    const entity = this.repository.create({
      tenantId: term.tenantId,
      name: term.name,
      days: term.days,
      description: term.description,
      isActive: term.isActive,
    });
    const saved = await this.repository.save(entity);
    return this.toDomain(saved);
  }

  async findById(id: string): Promise<PaymentTerm | null> {
    const entity = await this.repository.findOne({ where: { id } });
    return entity ? this.toDomain(entity) : null;
  }

  async findAll(
    params: FindAllPaymentTermsParams,
  ): Promise<Pagination<PaymentTerm>> {
    const { tenantId, page = 1, limit = 10, search } = params;

    const queryBuilder = this.repository
      .createQueryBuilder('pt')
      .where('pt.tenantId = :tenantId', { tenantId });

    if (search) {
      queryBuilder.andWhere('pt.name ILIKE :search', {
        search: `%${search}%`,
      });
    }

    queryBuilder.orderBy('pt.days', 'ASC').skip((page - 1) * limit).take(limit);

    const [items, totalItems] = await queryBuilder.getManyAndCount();

    return {
      data: items.map((item) => this.toDomain(item)),
      pagination: setPagination(totalItems, limit, page, items.length),
    };
  }

  async update(term: PaymentTerm): Promise<PaymentTerm> {
    const entity = await this.repository.findOne({ where: { id: term.id } });
    if (!entity) throw new EntityNotFoundException('PaymentTerm', term.id);

    entity.name = term.name;
    entity.days = term.days;
    entity.description = term.description;
    entity.isActive = term.isActive;

    const saved = await this.repository.save(entity);
    return this.toDomain(saved);
  }

  async delete(id: string): Promise<void> {
    const entity = await this.repository.findOne({ where: { id } });
    if (!entity) throw new EntityNotFoundException('PaymentTerm', id);
    await this.repository.softRemove(entity);
  }

  private toDomain(entity: PaymentTermEntity): PaymentTerm {
    const term = new PaymentTerm();
    term.id = entity.id;
    term.tenantId = entity.tenantId;
    term.name = entity.name;
    term.days = entity.days;
    term.description = entity.description;
    term.isActive = entity.isActive;
    return term;
  }
}
