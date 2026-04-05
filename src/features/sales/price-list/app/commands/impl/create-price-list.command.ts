export class CreatePriceListCommand {
  constructor(
    public readonly name: string,
    public readonly tenantId: string,
    public readonly isDefault: boolean,
    public readonly validFrom?: Date | null,
    public readonly validTo?: Date | null,
  ) {}
}
