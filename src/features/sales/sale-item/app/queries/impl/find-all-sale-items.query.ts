export class FindAllSaleItemsQuery {
  constructor(
    public readonly saleId: string,
    public readonly page?: number,
    public readonly limit?: number,
  ) {}
}
