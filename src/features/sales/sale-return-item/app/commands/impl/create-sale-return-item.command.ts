export class CreateSaleReturnItemCommand {
  constructor(
    public readonly saleReturnId: string,
    public readonly saleItemId: string,
    public readonly productId: string,
    public readonly quantity: number,
    public readonly unitPrice: number,
  ) {}
}
