export class CreateProductCommand {
  constructor(
    public readonly name: string,
    public readonly sku: string,
    public readonly tenantId: string,
    public readonly description?: string | null,
    public readonly active?: boolean,
    public readonly storable?: boolean,
    public readonly sellable?: boolean,
    public readonly buyable?: boolean,
    public readonly service?: boolean,
  ) {}
}
