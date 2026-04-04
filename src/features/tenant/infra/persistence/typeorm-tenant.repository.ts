import { ITenantRepository, Tenant } from '@features/tenant/domain';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TenantEntity } from './tenant.entity';

@Injectable()
export class TypeOrmTenantRepository implements ITenantRepository {
  constructor(
    @InjectRepository(TenantEntity)
    private readonly repository: Repository<TenantEntity>,
  ) {}

  async create(tenant: Tenant): Promise<Tenant> {
    const entity = this.repository.create({
      name: tenant.name,
      slug: tenant.slug,
      taxIdentifier: tenant.taxIdentifier,
      settings: tenant.settings,
      status: tenant.status,
    });
    const saved = await this.repository.save(entity);
    return this.toDomain(saved);
  }

  async findById(id: string): Promise<Tenant | null> {
    const entity = await this.repository.findOne({ where: { id } });
    return entity ? this.toDomain(entity) : null;
  }

  async findByTaxIdentifier(taxIdentifier: string): Promise<Tenant | null> {
    const entity = await this.repository.findOne({ where: { taxIdentifier } });
    return entity ? this.toDomain(entity) : null;
  }

  async update(tenant: Tenant): Promise<Tenant> {
    const entity = await this.repository.findOne({ where: { id: tenant.id } });
    if (!entity) {
      throw new NotFoundException('Tenant not found');
    }
    entity.name = tenant.name;
    entity.slug = tenant.slug;
    entity.taxIdentifier = tenant.taxIdentifier;
    entity.status = tenant.status;
    const saved = await this.repository.save(entity);
    return this.toDomain(saved);
  }

  async updateSettings(
    id: string,
    settings: Record<string, any>,
  ): Promise<Tenant> {
    const entity = await this.repository.findOne({ where: { id } });
    if (!entity) {
      throw new NotFoundException('Tenant not found');
    }
    entity.settings = { ...entity.settings, ...settings };
    const saved = await this.repository.save(entity);
    return this.toDomain(saved);
  }

  private toDomain(entity: TenantEntity): Tenant {
    const tenant = new Tenant();
    tenant.id = entity.id;
    tenant.name = entity.name;
    tenant.slug = entity.slug;
    tenant.taxIdentifier = entity.taxIdentifier;
    tenant.settings = entity.settings ?? {};
    tenant.status = entity.status;
    return tenant;
  }
}
