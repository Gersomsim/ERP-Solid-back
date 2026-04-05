export class UpdateSaleAgentCommand {
  constructor(
    public readonly id: string,
    public readonly name?: string,
    public readonly commissionRate?: number,
    public readonly userId?: string | null,
  ) {}
}
