export class ProductSaleData {
  id: string;
  productId: string;
  tenantId: string;
  price: number;
  taxType: string;
  isAvailableForSale: boolean;

  constructor() {}

  static create(
    productId: string,
    tenantId: string,
    price: number,
    taxType: string,
    isAvailableForSale: boolean,
  ): ProductSaleData {
    const data = new ProductSaleData();
    data.productId = productId;
    data.tenantId = tenantId;
    data.price = price;
    data.taxType = taxType;
    data.isAvailableForSale = isAvailableForSale;
    return data;
  }
}
