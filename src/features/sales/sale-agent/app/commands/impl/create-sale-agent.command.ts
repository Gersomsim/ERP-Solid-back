export class CreateSaleAgentCommand {
  constructor(
    public readonly name: string,
    public readonly tenantId: string,
    public readonly commissionRate: number,
    public readonly userId?: string | null,
  ) {}
}
