import { EntityNotFoundException } from '@features/common/exceptions';
import { Pagination } from '@features/common/interfaces';
import { setPagination } from '@features/common/utils';
import {
  CommissionRule,
  FindAllCommissionRulesParams,
  ICommissionRuleRepository,
} from '@features/sales/commission-rule/domain';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { CommissionRuleEntity } from './commission-rule.entity';

@Injectable()
export class TypeOrmCommissionRuleRepository
  implements ICommissionRuleRepository
{
  constructor(
    @InjectRepository(CommissionRuleEntity)
    private readonly repository: Repository<CommissionRuleEntity>,
  ) {}

  async create(rule: CommissionRule): Promise<CommissionRule> {
    const entity = this.repository.create({
      agentId: rule.agentId,
      tenantId: rule.tenantId,
      percentage: rule.percentage,
      isActive: rule.isActive,
    });
    const saved = await this.repository.save(entity);
    return this.toDomain(saved);
  }

  async findById(id: string): Promise<CommissionRule | null> {
    const entity = await this.repository.findOne({ where: { id } });
    return entity ? this.toDomain(entity) : null;
  }

  async findActiveByAgentId(
    agentId: string,
    tenantId: string,
  ): Promise<CommissionRule | null> {
    const entity = await this.repository.findOne({
      where: { agentId, tenantId, isActive: true },
    });
    return entity ? this.toDomain(entity) : null;
  }

  async findAll(
    params: FindAllCommissionRulesParams,
  ): Promise<Pagination<CommissionRule>> {
    const { tenantId, page = 1, limit = 10, agentId } = params;
    const where: FindOptionsWhere<CommissionRuleEntity> = { tenantId };
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

  async update(rule: CommissionRule): Promise<CommissionRule> {
    const entity = await this.repository.findOne({ where: { id: rule.id } });
    if (!entity) throw new EntityNotFoundException('CommissionRule', rule.id);

    entity.percentage = rule.percentage;
    entity.isActive = rule.isActive;

    const saved = await this.repository.save(entity);
    return this.toDomain(saved);
  }

  async delete(id: string): Promise<void> {
    const entity = await this.repository.findOne({ where: { id } });
    if (!entity) throw new EntityNotFoundException('CommissionRule', id);
    await this.repository.softRemove(entity);
  }

  private toDomain(entity: CommissionRuleEntity): CommissionRule {
    const rule = new CommissionRule();
    rule.id = entity.id;
    rule.agentId = entity.agentId;
    rule.tenantId = entity.tenantId;
    rule.percentage = Number(entity.percentage);
    rule.isActive = entity.isActive;
    return rule;
  }
}
