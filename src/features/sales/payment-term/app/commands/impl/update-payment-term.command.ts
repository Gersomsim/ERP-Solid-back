export class UpdatePaymentTermCommand {
  constructor(
    public readonly id: string,
    public readonly name?: string,
    public readonly days?: number,
    public readonly description?: string,
    public readonly isActive?: boolean,
  ) {}
}
