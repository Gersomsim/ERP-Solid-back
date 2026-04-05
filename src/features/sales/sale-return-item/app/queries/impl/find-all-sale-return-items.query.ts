export class FindAllSaleReturnItemsQuery {
  constructor(
    public readonly saleReturnId: string,
    public readonly page?: number,
    public readonly limit?: number,
  ) {}
}
