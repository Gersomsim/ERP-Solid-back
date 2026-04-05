import { EntityNotFoundException } from '@features/common/exceptions';
import { Pagination } from '@features/common/interfaces';
import { setPagination } from '@features/common/utils';
import {
  FindAllSalePaymentsParams,
  ISalePaymentRepository,
  SalePayment,
} from '@features/sales/sale-payment/domain';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SalePaymentEntity } from './sale-payment.entity';

@Injectable()
export class TypeOrmSalePaymentRepository implements ISalePaymentRepository {
  constructor(
    @InjectRepository(SalePaymentEntity)
    private readonly repository: Repository<SalePaymentEntity>,
  ) {}

  async create(payment: SalePayment): Promise<SalePayment> {
    const entity = this.repository.create({
      saleId: payment.saleId,
      amount: payment.amount,
      date: payment.date,
      reference: payment.reference,
      paymentMethodId: payment.paymentMethodId,
    });
    const saved = await this.repository.save(entity);
    return this.toDomain(saved);
  }

  async findById(id: string): Promise<SalePayment | null> {
    const entity = await this.repository.findOne({ where: { id } });
    return entity ? this.toDomain(entity) : null;
  }

  async findAll(
    params: FindAllSalePaymentsParams,
  ): Promise<Pagination<SalePayment>> {
    const { saleId, page = 1, limit = 10 } = params;

    const [items, totalItems] = await this.repository.findAndCount({
      where: { saleId },
      skip: (page - 1) * limit,
      take: limit,
      order: { createdAt: 'DESC' },
    });

    return {
      data: items.map((item) => this.toDomain(item)),
      pagination: setPagination(totalItems, limit, page, items.length),
    };
  }

  async update(payment: SalePayment): Promise<SalePayment> {
    const entity = await this.repository.findOne({
      where: { id: payment.id },
    });
    if (!entity) throw new EntityNotFoundException('SalePayment', payment.id);

    entity.amount = payment.amount;
    entity.date = payment.date;
    entity.reference = payment.reference;
    entity.paymentMethodId = payment.paymentMethodId;

    const saved = await this.repository.save(entity);
    return this.toDomain(saved);
  }

  async delete(id: string): Promise<void> {
    const entity = await this.repository.findOne({ where: { id } });
    if (!entity) throw new EntityNotFoundException('SalePayment', id);
    await this.repository.softRemove(entity);
  }

  private toDomain(entity: SalePaymentEntity): SalePayment {
    const payment = new SalePayment();
    payment.id = entity.id;
    payment.saleId = entity.saleId;
    payment.amount = Number(entity.amount);
    payment.date = entity.date;
    payment.reference = entity.reference;
    payment.paymentMethodId = entity.paymentMethodId;
    return payment;
  }
}
