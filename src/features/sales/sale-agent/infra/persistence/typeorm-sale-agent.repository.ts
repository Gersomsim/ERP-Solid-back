import { EntityNotFoundException } from '@features/common/exceptions';
import { Pagination } from '@features/common/interfaces';
import { setPagination } from '@features/common/utils';
import {
  FindAllSaleAgentsParams,
  ISaleAgentRepository,
  SaleAgent,
} from '@features/sales/sale-agent/domain';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Like, Repository } from 'typeorm';
import { SaleAgentEntity } from './sale-agent.entity';

@Injectable()
export class TypeOrmSaleAgentRepository implements ISaleAgentRepository {
  constructor(
    @InjectRepository(SaleAgentEntity)
    private readonly repository: Repository<SaleAgentEntity>,
  ) {}

  async create(agent: SaleAgent): Promise<SaleAgent> {
    const entity = this.repository.create({
      name: agent.name,
      tenantId: agent.tenantId,
      commissionRate: agent.commissionRate,
      userId: agent.userId,
    });
    const saved = await this.repository.save(entity);
    return this.toDomain(saved);
  }

  async findById(id: string): Promise<SaleAgent | null> {
    const entity = await this.repository.findOne({ where: { id } });
    return entity ? this.toDomain(entity) : null;
  }

  async findAll(params: FindAllSaleAgentsParams): Promise<Pagination<SaleAgent>> {
    const { tenantId, page = 1, limit = 10, search } = params;
    const where: FindOptionsWhere<SaleAgentEntity> = { tenantId };

    if (search) {
      where.name = Like(`%${search}%`);
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

  async update(agent: SaleAgent): Promise<SaleAgent> {
    const entity = await this.repository.findOne({ where: { id: agent.id } });
    if (!entity) throw new EntityNotFoundException('SaleAgent', agent.id);

    entity.name = agent.name;
    entity.commissionRate = agent.commissionRate;
    entity.userId = agent.userId;

    const saved = await this.repository.save(entity);
    return this.toDomain(saved);
  }

  async delete(id: string): Promise<void> {
    const entity = await this.repository.findOne({ where: { id } });
    if (!entity) throw new EntityNotFoundException('SaleAgent', id);
    await this.repository.softRemove(entity);
  }

  private toDomain(entity: SaleAgentEntity): SaleAgent {
    const agent = new SaleAgent();
    agent.id = entity.id;
    agent.name = entity.name;
    agent.tenantId = entity.tenantId;
    agent.commissionRate = Number(entity.commissionRate);
    agent.userId = entity.userId;
    return agent;
  }
}
