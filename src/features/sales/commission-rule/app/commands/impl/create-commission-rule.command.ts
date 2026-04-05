export class CreateCommissionRuleCommand {
  constructor(
    public readonly agentId: string,
    public readonly tenantId: string,
    public readonly percentage: number,
  ) {}
}
