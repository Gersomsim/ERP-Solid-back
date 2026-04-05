export class SaleItem {
  id: string;
  saleId: string;
  productId: string;
  quantity: number;
  unitPrice: number;
  tax: number;
  discount: number;
  total: number;

  constructor() {}

  static create(
    saleId: string,
    productId: string,
    quantity: number,
    unitPrice: number,
    tax: number,
    discount: number,
    total: number,
  ): SaleItem {
    const item = new SaleItem();
    item.saleId = saleId;
    item.productId = productId;
    item.quantity = quantity;
    item.unitPrice = unitPrice;
    item.tax = tax;
    item.discount = discount;
    item.total = total;
    return item;
  }
}
