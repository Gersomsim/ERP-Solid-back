import { EntityNotFoundException } from '@features/common/exceptions';
import { Pagination } from '@features/common/interfaces';
import { setPagination } from '@features/common/utils';
import {
  Commission,
  CommissionStatus,
  FindAllCommissionsParams,
  ICommissionRepository,
} from '@features/sales/commission/domain';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { CommissionEntity } from './commission.entity';

@Injectable()
export class TypeOrmCommissionRepository implements ICommissionRepository {
  constructor(
    @InjectRepository(CommissionEntity)
    private readonly repository: Repository<CommissionEntity>,
  ) {}

  async create(commission: Commission): Promise<Commission> {
    const entity = this.repository.create({
      saleId: commission.saleId,
      agentId: commission.agentId,
      tenantId: commission.tenantId,
      saleTotal: commission.saleTotal,
      percentage: commission.percentage,
      amount: commission.amount,
      status: commission.status,
      commissionPaymentId: commission.commissionPaymentId,
    });
    const saved = await this.repository.save(entity);
    return this.toDomain(saved);
  }

  async findById(id: string): Promise<Commission | null> {
    const entity = await this.repository.findOne({ where: { id } });
    return entity ? this.toDomain(entity) : null;
  }

  async findAll(
    params: FindAllCommissionsParams,
  ): Promise<Pagination<Commission>> {
    const { tenantId, page = 1, limit = 10, status, agentId, saleId } = params;
    const where: FindOptionsWhere<CommissionEntity> = { tenantId };

    if (status) where.status = status;
    if (agentId) where.agentId = agentId;
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

  async findApprovedByAgentId(
    agentId: string,
    tenantId: string,
  ): Promise<Commission[]> {
    const items = await this.repository.find({
      where: { agentId, tenantId, status: CommissionStatus.APPROVED },
      order: { createdAt: 'ASC' },
    });
    return items.map((item) => this.toDomain(item));
  }

  async update(commission: Commission): Promise<Commission> {
    const entity = await this.repository.findOne({
      where: { id: commission.id },
    });
    if (!entity) throw new EntityNotFoundException('Commission', commission.id);

    entity.status = commission.status;
    entity.commissionPaymentId = commission.commissionPaymentId;

    const saved = await this.repository.save(entity);
    return this.toDomain(saved);
  }

  private toDomain(entity: CommissionEntity): Commission {
    const commission = new Commission();
    commission.id = entity.id;
    commission.saleId = entity.saleId;
    commission.agentId = entity.agentId;
    commission.tenantId = entity.tenantId;
    commission.saleTotal = Number(entity.saleTotal);
    commission.percentage = Number(entity.percentage);
    commission.amount = Number(entity.amount);
    commission.status = entity.status;
    commission.commissionPaymentId = entity.commissionPaymentId;
    return commission;
  }
}
