export class UpdateCustomerCommand {
  constructor(
    public readonly id: string,
    public readonly name?: string,
    public readonly taxId?: string,
    public readonly creditLimit?: number,
    public readonly email?: string | null,
    public readonly phone?: string | null,
    public readonly address?: string | null,
    public readonly city?: string | null,
    public readonly state?: string | null,
    public readonly zip?: string | null,
    public readonly country?: string | null,
  ) {}
}
