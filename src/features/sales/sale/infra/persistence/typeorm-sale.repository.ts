import { EntityNotFoundException } from '@features/common/exceptions';
import { Pagination } from '@features/common/interfaces';
import { setPagination } from '@features/common/utils';
import {
  FindAllSalesParams,
  ISaleRepository,
  Sale,
} from '@features/sales/sale/domain';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Like, Repository } from 'typeorm';
import { SaleEntity } from './sale.entity';

@Injectable()
export class TypeOrmSaleRepository implements ISaleRepository {
  constructor(
    @InjectRepository(SaleEntity)
    private readonly repository: Repository<SaleEntity>,
  ) {}

  async create(sale: Sale): Promise<Sale> {
    const entity = this.repository.create({
      tenantId: sale.tenantId,
      customerId: sale.customerId,
      saleAgentId: sale.saleAgentId,
      folio: sale.folio,
      saleDate: sale.saleDate,
      subtotal: sale.subtotal,
      tax: sale.tax,
      discount: sale.discount,
      total: sale.total,
      status: sale.status,
      paymentTermId: sale.paymentTermId,
    });
    const saved = await this.repository.save(entity);
    return this.toDomain(saved);
  }

  async findById(id: string): Promise<Sale | null> {
    const entity = await this.repository.findOne({ where: { id } });
    return entity ? this.toDomain(entity) : null;
  }

  async findAll(params: FindAllSalesParams): Promise<Pagination<Sale>> {
    const {
      tenantId,
      page = 1,
      limit = 10,
      search,
      status,
      customerId,
      saleAgentId,
    } = params;
    const where: FindOptionsWhere<SaleEntity> = { tenantId };

    if (search) where.folio = Like(`%${search}%`);
    if (status) where.status = status;
    if (customerId) where.customerId = customerId;
    if (saleAgentId) where.saleAgentId = saleAgentId;

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

  async update(sale: Sale): Promise<Sale> {
    const entity = await this.repository.findOne({ where: { id: sale.id } });
    if (!entity) throw new EntityNotFoundException('Sale', sale.id);

    entity.customerId = sale.customerId;
    entity.saleAgentId = sale.saleAgentId;
    entity.folio = sale.folio;
    entity.saleDate = sale.saleDate;
    entity.subtotal = sale.subtotal;
    entity.tax = sale.tax;
    entity.discount = sale.discount;
    entity.total = sale.total;
    entity.status = sale.status;
    entity.paymentTermId = sale.paymentTermId;

    const saved = await this.repository.save(entity);
    return this.toDomain(saved);
  }

  async delete(id: string): Promise<void> {
    const entity = await this.repository.findOne({ where: { id } });
    if (!entity) throw new EntityNotFoundException('Sale', id);
    await this.repository.softRemove(entity);
  }

  private toDomain(entity: SaleEntity): Sale {
    const sale = new Sale();
    sale.id = entity.id;
    sale.tenantId = entity.tenantId;
    sale.customerId = entity.customerId;
    sale.saleAgentId = entity.saleAgentId;
    sale.folio = entity.folio;
    sale.saleDate = entity.saleDate;
    sale.subtotal = Number(entity.subtotal);
    sale.tax = Number(entity.tax);
    sale.discount = Number(entity.discount);
    sale.total = Number(entity.total);
    sale.status = entity.status;
    sale.paymentTermId = entity.paymentTermId;
    return sale;
  }
}
