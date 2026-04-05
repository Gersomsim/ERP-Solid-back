import { EntityNotFoundException } from '@features/common/exceptions';
import { Pagination } from '@features/common/interfaces';
import { setPagination } from '@features/common/utils';
import {
  FindAllSaleTargetsParams,
  ISaleTargetRepository,
  SaleTarget,
  SaleTargetView,
} from '@features/sales/sale-target/domain';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SaleTargetEntity } from './sale-target.entity';

const CONFIRMED_STATUSES = ['confirmed', 'invoiced', 'paid'];

@Injectable()
export class TypeOrmSaleTargetRepository implements ISaleTargetRepository {
  constructor(
    @InjectRepository(SaleTargetEntity)
    private readonly repository: Repository<SaleTargetEntity>,
  ) {}

  async create(target: SaleTarget): Promise<SaleTarget> {
    const entity = this.repository.create({
      agentId: target.agentId,
      tenantId: target.tenantId,
      periodFrom: target.periodFrom,
      periodTo: target.periodTo,
      targetAmount: target.targetAmount,
    });
    const saved = await this.repository.save(entity);
    return this.toDomain(saved);
  }

  async findById(id: string): Promise<SaleTarget | null> {
    const entity = await this.repository.findOne({ where: { id } });
    return entity ? this.toDomain(entity) : null;
  }

  async update(target: SaleTarget): Promise<SaleTarget> {
    const entity = await this.repository.findOne({ where: { id: target.id } });
    if (!entity) throw new EntityNotFoundException('SaleTarget', target.id);

    entity.agentId = target.agentId;
    entity.periodFrom = target.periodFrom;
    entity.periodTo = target.periodTo;
    entity.targetAmount = target.targetAmount;

    const saved = await this.repository.save(entity);
    return this.toDomain(saved);
  }

  async delete(id: string): Promise<void> {
    const entity = await this.repository.findOne({ where: { id } });
    if (!entity) throw new EntityNotFoundException('SaleTarget', id);
    await this.repository.softRemove(entity);
  }

  async findAllView(
    params: FindAllSaleTargetsParams,
  ): Promise<Pagination<SaleTargetView>> {
    const { tenantId, page = 1, limit = 10, agentId } = params;

    const queryBuilder = this.buildViewQuery(tenantId);

    if (agentId) {
      queryBuilder.andWhere('st.agentId = :agentId', { agentId });
    }

    queryBuilder
      .orderBy('st.periodFrom', 'DESC')
      .skip((page - 1) * limit)
      .take(limit);

    const [items, totalItems] = await queryBuilder.getManyAndCount();

    return {
      data: items.map((item) => this.toView(item)),
      pagination: setPagination(totalItems, limit, page, items.length),
    };
  }

  async findViewById(id: string): Promise<SaleTargetView | null> {
    const entity = await this.buildViewQuery(null)
      .andWhere('st.id = :id', { id })
      .getOne();
    return entity ? this.toView(entity) : null;
  }

  private buildViewQuery(tenantId: string | null) {
    const qb = this.repository
      .createQueryBuilder('st')
      .addSelect(
        `COALESCE(SUM(CASE WHEN s.status IN (:...statuses) AND s.deleted_at IS NULL THEN s.total ELSE 0 END), 0)`,
        'achieved_amount',
      )
      .leftJoin(
        'sales',
        's',
        `s.sale_agent_id = st.agent_id
         AND s.tenant_id = st.tenant_id
         AND s.sale_date BETWEEN st.period_from AND st.period_to`,
      )
      .setParameter('statuses', CONFIRMED_STATUSES)
      .groupBy('st.id');

    if (tenantId) {
      qb.where('st.tenantId = :tenantId', { tenantId });
    }

    return qb;
  }

  private toDomain(entity: SaleTargetEntity): SaleTarget {
    const target = new SaleTarget();
    target.id = entity.id;
    target.agentId = entity.agentId;
    target.tenantId = entity.tenantId;
    target.periodFrom = entity.periodFrom;
    target.periodTo = entity.periodTo;
    target.targetAmount = Number(entity.targetAmount);
    return target;
  }

  private toView(entity: SaleTargetEntity & { achieved_amount?: string }): SaleTargetView {
    const view = new SaleTargetView();
    view.id = entity.id;
    view.agentId = entity.agentId;
    view.tenantId = entity.tenantId;
    view.periodFrom = entity.periodFrom;
    view.periodTo = entity.periodTo;
    view.targetAmount = Number(entity.targetAmount);
    view.achievedAmount = Number(entity['achieved_amount'] ?? 0);
    view.percentage = view.targetAmount > 0
      ? Number(((view.achievedAmount / view.targetAmount) * 100).toFixed(2))
      : 0;
    view.remaining = Number((view.targetAmount - view.achievedAmount).toFixed(2));
    return view;
  }
}
