export class SaleConfirmedEvent {
  constructor(
    public readonly saleId: string,
    public readonly saleAgentId: string,
    public readonly tenantId: string,
    public readonly total: number,
  ) {}
}
