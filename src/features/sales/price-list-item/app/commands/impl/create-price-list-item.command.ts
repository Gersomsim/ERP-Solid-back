export class CreatePriceListItemCommand {
  constructor(
    public readonly priceListId: string,
    public readonly productSaleDataId: string,
    public readonly price: number,
    public readonly minQuantity: number,
  ) {}
}
