import { EntityNotFoundException } from '@features/common/exceptions';
import { Pagination } from '@features/common/interfaces';
import { setPagination } from '@features/common/utils';
import {
  FindAllSaleReturnsParams,
  ISaleReturnRepository,
  SaleReturn,
} from '@features/sales/sale-return/domain';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { SaleReturnEntity } from './sale-return.entity';

@Injectable()
export class TypeOrmSaleReturnRepository implements ISaleReturnRepository {
  constructor(
    @InjectRepository(SaleReturnEntity)
    private readonly repository: Repository<SaleReturnEntity>,
  ) {}

  async create(saleReturn: SaleReturn): Promise<SaleReturn> {
    const entity = this.repository.create({
      saleId: saleReturn.saleId,
      tenantId: saleReturn.tenantId,
      reason: saleReturn.reason,
      status: saleReturn.status,
      resolutionType: saleReturn.resolutionType,
      notes: saleReturn.notes,
    });
    const saved = await this.repository.save(entity);
    return this.toDomain(saved);
  }

  async findById(id: string): Promise<SaleReturn | null> {
    const entity = await this.repository.findOne({ where: { id } });
    return entity ? this.toDomain(entity) : null;
  }

  async findAll(
    params: FindAllSaleReturnsParams,
  ): Promise<Pagination<SaleReturn>> {
    const { tenantId, page = 1, limit = 10, status, saleId } = params;
    const where: FindOptionsWhere<SaleReturnEntity> = { tenantId };

    if (status) where.status = status;
    if (saleId) where.saleId = saleId;

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

  async update(saleReturn: SaleReturn): Promise<SaleReturn> {
    const entity = await this.repository.findOne({
      where: { id: saleReturn.id },
    });
    if (!entity) throw new EntityNotFoundException('SaleReturn', saleReturn.id);

    entity.reason = saleReturn.reason;
    entity.status = saleReturn.status;
    entity.resolutionType = saleReturn.resolutionType;
    entity.notes = saleReturn.notes;

    const saved = await this.repository.save(entity);
    return this.toDomain(saved);
  }

  async delete(id: string): Promise<void> {
    const entity = await this.repository.findOne({ where: { id } });
    if (!entity) throw new EntityNotFoundException('SaleReturn', id);
    await this.repository.softRemove(entity);
  }

  private toDomain(entity: SaleReturnEntity): SaleReturn {
    const saleReturn = new SaleReturn();
    saleReturn.id = entity.id;
    saleReturn.saleId = entity.saleId;
    saleReturn.tenantId = entity.tenantId;
    saleReturn.reason = entity.reason;
    saleReturn.status = entity.status;
    saleReturn.resolutionType = entity.resolutionType;
    saleReturn.notes = entity.notes;
    return saleReturn;
  }
}
