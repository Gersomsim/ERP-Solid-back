export class CreateSaleItemCommand {
  constructor(
    public readonly saleId: string,
    public readonly productId: string,
    public readonly quantity: number,
    public readonly unitPrice: number,
    public readonly tax: number,
    public readonly discount: number,
    public readonly total: number,
  ) {}
}
