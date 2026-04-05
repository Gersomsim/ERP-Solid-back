export class CreateSaleTargetCommand {
  constructor(
    public readonly agentId: string,
    public readonly tenantId: string,
    public readonly periodFrom: Date,
    public readonly periodTo: Date,
    public readonly targetAmount: number,
  ) {}
}
