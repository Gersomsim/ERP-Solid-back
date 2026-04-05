import { EntityNotFoundException } from '@features/common/exceptions';
import { Pagination } from '@features/common/interfaces';
import { setPagination } from '@features/common/utils';
import {
  CommissionPayment,
  FindAllCommissionPaymentsParams,
  ICommissionPaymentRepository,
} from '@features/sales/commission-payment/domain';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { CommissionPaymentEntity } from './commission-payment.entity';

@Injectable()
export class TypeOrmCommissionPaymentRepository
  implements ICommissionPaymentRepository
{
  constructor(
    @InjectRepository(CommissionPaymentEntity)
    private readonly repository: Repository<CommissionPaymentEntity>,
  ) {}

  async create(payment: CommissionPayment): Promise<CommissionPayment> {
    const entity = this.repository.create({
      agentId: payment.agentId,
      tenantId: payment.tenantId,
      periodFrom: payment.periodFrom,
      periodTo: payment.periodTo,
      totalAmount: payment.totalAmount,
      status: payment.status,
    });
    const saved = await this.repository.save(entity);
    return this.toDomain(saved);
  }

  async findById(id: string): Promise<CommissionPayment | null> {
    const entity = await this.repository.findOne({ where: { id } });
    return entity ? this.toDomain(entity) : null;
  }

  async findAll(
    params: FindAllCommissionPaymentsParams,
  ): Promise<Pagination<CommissionPayment>> {
    const { tenantId, page = 1, limit = 10, agentId } = params;
    const where: FindOptionsWhere<CommissionPaymentEntity> = { tenantId };
    if (agentId) where.agentId = agentId;

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

  async update(payment: CommissionPayment): Promise<CommissionPayment> {
    const entity = await this.repository.findOne({ where: { id: payment.id } });
    if (!entity)
      throw new EntityNotFoundException('CommissionPayment', payment.id);
    entity.status = payment.status;
    const saved = await this.repository.save(entity);
    return this.toDomain(saved);
  }

  async delete(id: string): Promise<void> {
    const entity = await this.repository.findOne({ where: { id } });
    if (!entity) throw new EntityNotFoundException('CommissionPayment', id);
    await this.repository.softRemove(entity);
  }

  private toDomain(entity: CommissionPaymentEntity): CommissionPayment {
    const payment = new CommissionPayment();
    payment.id = entity.id;
    payment.agentId = entity.agentId;
    payment.tenantId = entity.tenantId;
    payment.periodFrom = entity.periodFrom;
    payment.periodTo = entity.periodTo;
    payment.totalAmount = Number(entity.totalAmount);
    payment.status = entity.status;
    return payment;
  }
}
