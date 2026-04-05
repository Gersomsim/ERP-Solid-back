export class CreateCommissionPaymentCommand {
  constructor(
    public readonly agentId: string,
    public readonly tenantId: string,
    public readonly periodFrom: Date,
    public readonly periodTo: Date,
  ) {}
}
