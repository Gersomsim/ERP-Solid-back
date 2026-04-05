export class CreateSaleCommand {
  constructor(
    public readonly tenantId: string,
    public readonly customerId: string,
    public readonly saleAgentId: string,
    public readonly folio: string,
    public readonly saleDate: Date,
    public readonly subtotal: number,
    public readonly tax: number,
    public readonly discount: number,
    public readonly total: number,
  ) {}
}
