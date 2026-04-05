export class FindAllPriceListItemsQuery {
  constructor(
    public readonly priceListId: string,
    public readonly page?: number,
    public readonly limit?: number,
    public readonly search?: string,
  ) {}
}
