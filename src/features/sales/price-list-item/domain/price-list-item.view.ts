export class PriceListItemView {
  id: string;
  priceListId: string;
  productSaleDataId: string;
  price: number;
  minQuantity: number;

  // product info (join)
  productName: string;
  productSku: string;
  productService: boolean;
  basePriceFromSaleData: number;
}
