import { Tenant } from './tenant.model';

export interface ITenantRepository {
  create(tenant: Tenant): Promise<Tenant>;
  findById(id: string): Promise<Tenant | null>;
  findByTaxIdentifier(taxIdentifier: string): Promise<Tenant | null>;
  update(tenant: Tenant): Promise<Tenant>;
  updateSettings(id: string, settings: Record<string, any>): Promise<Tenant>;
}
