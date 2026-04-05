export class CreatePaymentTermCommand {
  constructor(
    public readonly tenantId: string,
    public readonly name: string,
    public readonly days: number,
    public readonly description: string,
  ) {}
}
