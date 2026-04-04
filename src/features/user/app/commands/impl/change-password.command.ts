export class ChangePasswordCommand {
  constructor(
    public readonly id: string,
    public readonly newPassword: string,
    public readonly oldPassword: string,
  ) {}
}
