export class SaleReturnItem {
  id: string;
  saleReturnId: string;
  saleItemId: string;
  productId: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;

  constructor() {}

  static create(
    saleReturnId: string,
    saleItemId: string,
    productId: string,
    quantity: number,
    unitPrice: number,
  ): SaleReturnItem {
    const item = new SaleReturnItem();
    item.saleReturnId = saleReturnId;
    item.saleItemId = saleItemId;
    item.productId = productId;
    item.quantity = quantity;
    item.unitPrice = unitPrice;
    item.subtotal = quantity * unitPrice;
    return item;
  }
}
