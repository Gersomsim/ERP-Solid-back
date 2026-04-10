import { EntityNotFoundException } from '@features/common/exceptions';
import { Pagination } from '@features/common/interfaces';
import { setPagination } from '@features/common/utils';
import {
  Product,
  FindAllProductsParams,
  IProductRepository,
} from '@features/products/product/domain';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, ILike, Repository } from 'typeorm';
import { ProductEntity } from './product.entity';

@Injectable()
export class TypeOrmProductRepository implements IProductRepository {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly repository: Repository<ProductEntity>,
  ) {}

  async create(product: Product): Promise<Product> {
    const entity = this.repository.create({
      name: product.name,
      sku: product.sku,
      tenantId: product.tenantId,
      description: product.description,
      active: product.active,
      storable: product.storable,
      sellable: product.sellable,
      buyable: product.buyable,
      service: product.service,
    });
    const saved = await this.repository.save(entity);
    return this.toDomain(saved);
  }

  async findById(id: string): Promise<Product | null> {
    const entity = await this.repository.findOne({ where: { id } });
    return entity ? this.toDomain(entity) : null;
  }

  async findAll(params: FindAllProductsParams): Promise<Pagination<Product>> {
    const { tenantId, page = 1, limit = 10, search } = params;
    const where: FindOptionsWhere<ProductEntity> = { tenantId };

    if (search) {
      where.name = ILike(`%${search}%`);
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

  async update(product: Product): Promise<Product> {
    const entity = await this.repository.findOne({ where: { id: product.id } });
    if (!entity) throw new EntityNotFoundException('Product', product.id);

    entity.name = product.name;
    entity.sku = product.sku;
    entity.description = product.description;
    entity.active = product.active;
    entity.storable = product.storable;
    entity.sellable = product.sellable;
    entity.buyable = product.buyable;
    entity.service = product.service;

    const saved = await this.repository.save(entity);
    return this.toDomain(saved);
  }

  async delete(id: string): Promise<void> {
    const entity = await this.repository.findOne({ where: { id } });
    if (!entity) throw new EntityNotFoundException('Product', id);
    await this.repository.remove(entity);
  }

  private toDomain(entity: ProductEntity): Product {
    const product = new Product();
    product.id = entity.id;
    product.name = entity.name;
    product.sku = entity.sku;
    product.tenantId = entity.tenantId;
    product.description = entity.description;
    product.active = entity.active;
    product.storable = entity.storable;
    product.sellable = entity.sellable;
    product.buyable = entity.buyable;
    product.service = entity.service;
    return product;
  }
}
