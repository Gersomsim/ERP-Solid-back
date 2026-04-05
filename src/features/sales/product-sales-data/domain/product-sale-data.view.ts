export class ProductSaleDataView {
  id: string;
  productId: string;
  tenantId: string;

  // sales context
  price: number;
  taxType: string;
  isAvailableForSale: boolean;

  // base product (join)
  name: string;
  description: string | null;
  sku: string;
  service: boolean;
}
