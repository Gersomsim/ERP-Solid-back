export class CreateRoleCommand {
  constructor(
    public readonly name: string,
    public readonly tenantId: string,
    public readonly permissionSlugs: string[] = [],
  ) {}
}
