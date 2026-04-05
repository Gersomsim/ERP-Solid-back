export class FindAllProductSaleDataQuery {
  constructor(
    public readonly tenantId: string,
    public readonly page?: number,
    public readonly limit?: number,
    public readonly search?: string,
    public readonly isAvailableForSale?: boolean,
  ) {}
}
