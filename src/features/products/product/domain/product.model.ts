export class Product {
  id: string;
  name: string;
  description: string | null;
  sku: string;
  active: boolean;
  storable: boolean;
  sellable: boolean;
  buyable: boolean;
  service: boolean;
  tenantId: string;

  constructor() {}

  static create(
    name: string,
    sku: string,
    tenantId: string,
    description?: string | null,
    active?: boolean,
    storable?: boolean,
    sellable?: boolean,
    buyable?: boolean,
    service?: boolean,
  ): Product {
    const product = new Product();
    product.name = name;
    product.sku = sku;
    product.tenantId = tenantId;
    product.description = description ?? null;
    product.active = active ?? true;
    product.storable = storable ?? true;
    product.sellable = sellable ?? true;
    product.buyable = buyable ?? true;
    product.service = service ?? false;
    return product;
  }
}
