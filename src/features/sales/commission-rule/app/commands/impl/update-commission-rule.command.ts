export class UpdateCommissionRuleCommand {
  constructor(
    public readonly id: string,
    public readonly percentage?: number,
    public readonly isActive?: boolean,
  ) {}
}
