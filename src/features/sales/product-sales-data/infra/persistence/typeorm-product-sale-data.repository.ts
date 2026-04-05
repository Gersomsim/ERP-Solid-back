import { EntityNotFoundException } from '@features/common/exceptions';
import { Pagination } from '@features/common/interfaces';
import { setPagination } from '@features/common/utils';
import {
  FindAllProductSaleDataParams,
  IProductSaleDataRepository,
  ProductSaleData,
  ProductSaleDataView,
} from '@features/sales/product-sales-data/domain';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Like, Repository } from 'typeorm';
import { ProductSaleData as ProductSaleDataEntity } from './product-sale-data.entity';

@Injectable()
export class TypeOrmProductSaleDataRepository
  implements IProductSaleDataRepository
{
  constructor(
    @InjectRepository(ProductSaleDataEntity)
    private readonly repository: Repository<ProductSaleDataEntity>,
  ) {}

  async create(data: ProductSaleData): Promise<ProductSaleData> {
    const entity = this.repository.create({
      productId: data.productId,
      tenantId: data.tenantId,
      price: data.price,
      taxType: data.taxType,
      isAvailableForSale: data.isAvailableForSale,
    });
    const saved = await this.repository.save(entity);
    return this.toDomain(saved);
  }

  async findById(id: string): Promise<ProductSaleData | null> {
    const entity = await this.repository.findOne({ where: { id } });
    return entity ? this.toDomain(entity) : null;
  }

  async update(data: ProductSaleData): Promise<ProductSaleData> {
    const entity = await this.repository.findOne({ where: { id: data.id } });
    if (!entity) throw new EntityNotFoundException('ProductSaleData', data.id);

    entity.price = data.price;
    entity.taxType = data.taxType;
    entity.isAvailableForSale = data.isAvailableForSale;

    const saved = await this.repository.save(entity);
    return this.toDomain(saved);
  }

  async delete(id: string): Promise<void> {
    const entity = await this.repository.findOne({ where: { id } });
    if (!entity) throw new EntityNotFoundException('ProductSaleData', id);
    await this.repository.softRemove(entity);
  }

  async findAllView(
    params: FindAllProductSaleDataParams,
  ): Promise<Pagination<ProductSaleDataView>> {
    const { tenantId, page = 1, limit = 10, search, isAvailableForSale } =
      params;
    const where: FindOptionsWhere<ProductSaleDataEntity> = { tenantId };

    if (isAvailableForSale !== undefined)
      where.isAvailableForSale = isAvailableForSale;

    const queryBuilder = this.repository
      .createQueryBuilder('psd')
      .innerJoinAndSelect('psd.product', 'product')
      .where('psd.tenantId = :tenantId', { tenantId });

    if (isAvailableForSale !== undefined) {
      queryBuilder.andWhere('psd.isAvailableForSale = :isAvailableForSale', {
        isAvailableForSale,
      });
    }

    if (search) {
      queryBuilder.andWhere(
        '(product.name ILIKE :search OR product.sku ILIKE :search)',
        { search: `%${search}%` },
      );
    }

    queryBuilder
      .orderBy('psd.createdAt', 'DESC')
      .skip((page - 1) * limit)
      .take(limit);

    const [items, totalItems] = await queryBuilder.getManyAndCount();

    return {
      data: items.map((item) => this.toView(item)),
      pagination: setPagination(totalItems, limit, page, items.length),
    };
  }

  async findViewById(id: string): Promise<ProductSaleDataView | null> {
    const entity = await this.repository
      .createQueryBuilder('psd')
      .innerJoinAndSelect('psd.product', 'product')
      .where('psd.id = :id', { id })
      .getOne();
    return entity ? this.toView(entity) : null;
  }

  private toDomain(entity: ProductSaleDataEntity): ProductSaleData {
    const data = new ProductSaleData();
    data.id = entity.id;
    data.productId = entity.productId;
    data.tenantId = entity.tenantId;
    data.price = Number(entity.price);
    data.taxType = entity.taxType;
    data.isAvailableForSale = entity.isAvailableForSale;
    return data;
  }

  private toView(entity: ProductSaleDataEntity): ProductSaleDataView {
    const view = new ProductSaleDataView();
    view.id = entity.id;
    view.productId = entity.productId;
    view.tenantId = entity.tenantId;
    view.price = Number(entity.price);
    view.taxType = entity.taxType;
    view.isAvailableForSale = entity.isAvailableForSale;
    // base product fields
    view.name = entity.product.name;
    view.description = entity.product.description ?? null;
    view.sku = entity.product.sku;
    view.service = entity.product.service;
    return view;
  }
}
