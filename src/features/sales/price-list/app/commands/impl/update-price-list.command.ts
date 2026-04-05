export class UpdatePriceListCommand {
  constructor(
    public readonly id: string,
    public readonly name?: string,
    public readonly isDefault?: boolean,
    public readonly validFrom?: Date | null,
    public readonly validTo?: Date | null,
  ) {}
}
