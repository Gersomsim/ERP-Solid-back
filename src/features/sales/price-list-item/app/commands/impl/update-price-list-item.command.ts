export class UpdatePriceListItemCommand {
  constructor(
    public readonly id: string,
    public readonly price?: number,
    public readonly minQuantity?: number,
  ) {}
}
