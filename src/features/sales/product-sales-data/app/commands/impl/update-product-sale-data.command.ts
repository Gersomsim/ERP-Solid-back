export class UpdateProductSaleDataCommand {
  constructor(
    public readonly id: string,
    public readonly price?: number,
    public readonly taxType?: string,
    public readonly isAvailableForSale?: boolean,
  ) {}
}
