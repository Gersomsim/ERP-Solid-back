import { EntityNotFoundException } from '@features/common/exceptions';
import { Pagination } from '@features/common/interfaces';
import { setPagination } from '@features/common/utils';
import {
  FindAllPriceListItemsParams,
  IPriceListItemRepository,
  PriceListItem,
  PriceListItemView,
} from '@features/sales/price-list-item/domain';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PriceListItemEntity } from './price-list-item.entity';

@Injectable()
export class TypeOrmPriceListItemRepository
  implements IPriceListItemRepository
{
  constructor(
    @InjectRepository(PriceListItemEntity)
    private readonly repository: Repository<PriceListItemEntity>,
  ) {}

  async create(item: PriceListItem): Promise<PriceListItem> {
    const entity = this.repository.create({
      priceListId: item.priceListId,
      productSaleDataId: item.productSaleDataId,
      price: item.price,
      minQuantity: item.minQuantity,
    });
    const saved = await this.repository.save(entity);
    return this.toDomain(saved);
  }

  async findById(id: string): Promise<PriceListItem | null> {
    const entity = await this.repository.findOne({ where: { id } });
    return entity ? this.toDomain(entity) : null;
  }

  async update(item: PriceListItem): Promise<PriceListItem> {
    const entity = await this.repository.findOne({ where: { id: item.id } });
    if (!entity) throw new EntityNotFoundException('PriceListItem', item.id);

    entity.price = item.price;
    entity.minQuantity = item.minQuantity;

    const saved = await this.repository.save(entity);
    return this.toDomain(saved);
  }

  async delete(id: string): Promise<void> {
    const entity = await this.repository.findOne({ where: { id } });
    if (!entity) throw new EntityNotFoundException('PriceListItem', id);
    await this.repository.softRemove(entity);
  }

  async findAllView(
    params: FindAllPriceListItemsParams,
  ): Promise<Pagination<PriceListItemView>> {
    const { priceListId, page = 1, limit = 10, search } = params;

    const queryBuilder = this.repository
      .createQueryBuilder('pli')
      .innerJoinAndSelect('pli.productSaleData', 'psd')
      .innerJoinAndSelect('psd.product', 'product')
      .where('pli.priceListId = :priceListId', { priceListId });

    if (search) {
      queryBuilder.andWhere(
        '(product.name ILIKE :search OR product.sku ILIKE :search)',
        { search: `%${search}%` },
      );
    }

    queryBuilder
      .orderBy('pli.createdAt', 'DESC')
      .skip((page - 1) * limit)
      .take(limit);

    const [items, totalItems] = await queryBuilder.getManyAndCount();

    return {
      data: items.map((item) => this.toView(item)),
      pagination: setPagination(totalItems, limit, page, items.length),
    };
  }

  async findViewById(id: string): Promise<PriceListItemView | null> {
    const entity = await this.repository
      .createQueryBuilder('pli')
      .innerJoinAndSelect('pli.productSaleData', 'psd')
      .innerJoinAndSelect('psd.product', 'product')
      .where('pli.id = :id', { id })
      .getOne();
    return entity ? this.toView(entity) : null;
  }

  private toDomain(entity: PriceListItemEntity): PriceListItem {
    const item = new PriceListItem();
    item.id = entity.id;
    item.priceListId = entity.priceListId;
    item.productSaleDataId = entity.productSaleDataId;
    item.price = Number(entity.price);
    item.minQuantity = entity.minQuantity;
    return item;
  }

  private toView(entity: PriceListItemEntity): PriceListItemView {
    const view = new PriceListItemView();
    view.id = entity.id;
    view.priceListId = entity.priceListId;
    view.productSaleDataId = entity.productSaleDataId;
    view.price = Number(entity.price);
    view.minQuantity = entity.minQuantity;
    // joined fields
    view.productName = entity.productSaleData.product.name;
    view.productSku = entity.productSaleData.product.sku;
    view.productService = entity.productSaleData.product.service;
    view.basePriceFromSaleData = Number(entity.productSaleData.price);
    return view;
  }
}
