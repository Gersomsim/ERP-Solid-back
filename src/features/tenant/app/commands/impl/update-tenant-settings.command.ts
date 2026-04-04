export class UpdateTenantSettingsCommand {
  constructor(
    public readonly id: string,
    public readonly settings: Record<string, any>,
  ) {}
}
