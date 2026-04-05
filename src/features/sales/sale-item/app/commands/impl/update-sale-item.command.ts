export class UpdateSaleItemCommand {
  constructor(
    public readonly id: string,
    public readonly quantity?: number,
    public readonly unitPrice?: number,
    public readonly tax?: number,
    public readonly discount?: number,
    public readonly total?: number,
  ) {}
}
