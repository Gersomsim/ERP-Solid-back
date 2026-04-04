export class UpdateProfileCommand {
  constructor(
    public readonly userId: string,
    public readonly firstName?: string,
    public readonly lastName?: string,
    public readonly avatarUrl?: string,
    public readonly jobTitle?: string,
    public readonly phoneNumber?: string,
  ) {}
}
