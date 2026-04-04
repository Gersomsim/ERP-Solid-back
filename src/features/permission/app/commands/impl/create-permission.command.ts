export class CreatePermissionCommand {
  constructor(
    public readonly slug: string,
    public readonly name: string,
    public readonly group: string,
  ) {}
}
