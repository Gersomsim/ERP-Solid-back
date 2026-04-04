export class UpdateUserCommand {
  constructor(
    public readonly id: string,
    public readonly mfaEnabled: boolean,
    public readonly mfaSecret: string,
  ) {}
}
