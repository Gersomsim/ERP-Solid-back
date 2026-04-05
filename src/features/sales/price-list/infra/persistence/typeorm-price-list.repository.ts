import { EntityNotFoundException } from '@features/common/exceptions';
import { Pagination } from '@features/common/interfaces';
import { setPagination } from '@features/common/utils';
import {
  FindAllPriceListsParams,
  IPriceListRepository,
  PriceList,
} from '@features/sales/price-list/domain';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PriceListEntity } from './price-list.entity';

@Injectable()
export class TypeOrmPriceListRepository implements IPriceListRepository {
  constructor(
    @InjectRepository(PriceListEntity)
    private readonly repository: Repository<PriceListEntity>,
  ) {}

  async create(priceList: PriceList): Promise<PriceList> {
    const entity = this.repository.create({
      name: priceList.name,
      tenantId: priceList.tenantId,
      isDefault: priceList.isDefault,
      validFrom: priceList.validFrom,
      validTo: priceList.validTo,
    });
    const saved = await this.repository.save(entity);
    return this.toDomain(saved);
  }

  async findById(id: string): Promise<PriceList | null> {
    const entity = await this.repository.findOne({ where: { id } });
    return entity ? this.toDomain(entity) : null;
  }

  async findAll(params: FindAllPriceListsParams): Promise<Pagination<PriceList>> {
    const { tenantId, page = 1, limit = 10, search } = params;

    const queryBuilder = this.repository
      .createQueryBuilder('pl')
      .where('pl.tenantId = :tenantId', { tenantId });

    if (search) {
      queryBuilder.andWhere('pl.name ILIKE :search', {
        search: `%${search}%`,
      });
    }

    queryBuilder.orderBy('pl.createdAt', 'DESC').skip((page - 1) * limit).take(limit);

    const [items, totalItems] = await queryBuilder.getManyAndCount();

    return {
      data: items.map((item) => this.toDomain(item)),
      pagination: setPagination(totalItems, limit, page, items.length),
    };
  }

  async update(priceList: PriceList): Promise<PriceList> {
    const entity = await this.repository.findOne({
      where: { id: priceList.id },
    });
    if (!entity) throw new EntityNotFoundException('PriceList', priceList.id);

    entity.name = priceList.name;
    entity.isDefault = priceList.isDefault;
    entity.validFrom = priceList.validFrom;
    entity.validTo = priceList.validTo;

    const saved = await this.repository.save(entity);
    return this.toDomain(saved);
  }

  async delete(id: string): Promise<void> {
    const entity = await this.repository.findOne({ where: { id } });
    if (!entity) throw new EntityNotFoundException('PriceList', id);
    await this.repository.softRemove(entity);
  }

  private toDomain(entity: PriceListEntity): PriceList {
    const priceList = new PriceList();
    priceList.id = entity.id;
    priceList.name = entity.name;
    priceList.tenantId = entity.tenantId;
    priceList.isDefault = entity.isDefault;
    priceList.validFrom = entity.validFrom;
    priceList.validTo = entity.validTo;
    return priceList;
  }
}
