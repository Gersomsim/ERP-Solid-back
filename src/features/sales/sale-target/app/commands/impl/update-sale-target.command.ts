export class UpdateSaleTargetCommand {
  constructor(
    public readonly id: string,
    public readonly agentId?: string,
    public readonly periodFrom?: Date,
    public readonly periodTo?: Date,
    public readonly targetAmount?: number,
  ) {}
}
