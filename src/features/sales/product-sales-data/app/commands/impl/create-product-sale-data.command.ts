export class CreateProductSaleDataCommand {
  constructor(
    public readonly productId: string,
    public readonly tenantId: string,
    public readonly price: number,
    public readonly taxType: string,
    public readonly isAvailableForSale: boolean,
  ) {}
}
