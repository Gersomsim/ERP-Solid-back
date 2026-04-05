export class PriceListItem {
  id: string;
  priceListId: string;
  productSaleDataId: string;
  price: number;
  minQuantity: number;

  constructor() {}

  static create(
    priceListId: string,
    productSaleDataId: string,
    price: number,
    minQuantity: number,
  ): PriceListItem {
    const item = new PriceListItem();
    item.priceListId = priceListId;
    item.productSaleDataId = productSaleDataId;
    item.price = price;
    item.minQuantity = minQuantity;
    return item;
  }
}
