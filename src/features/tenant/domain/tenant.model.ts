export class Tenant {
  id: string;
  name: string;
  slug: string;
  taxIdentifier: string;
  settings: Record<string, any>;
  status: string;

  constructor() {}

  static create(name: string, slug: string, taxIdentifier: string): Tenant {
    const tenant = new Tenant();
    tenant.name = name;
    tenant.slug = slug;
    tenant.taxIdentifier = taxIdentifier;
    tenant.settings = {};
    tenant.status = 'active';
    return tenant;
  }
}
