export class Token {
  constructor(
    public readonly id: string,
    public readonly userId: string,
    public readonly selector: string,
    public readonly rawToken: string,
    public readonly type: string,
    public readonly isRevoked: boolean,
    public readonly expiresAt: Date,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
    public readonly hashedToken?: string,
  ) {}

  static create(userId: string, type: string) {
    const selector = crypto.randomUUID();
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);
    const rawToken = `${selector}.${crypto.randomUUID()}`;
    return new Token(
      crypto.randomUUID(),
      userId,
      selector,
      rawToken,
      type,
      false,
      expiresAt,
      new Date(),
      new Date(),
    );
  }

  isExpired(now: Date): boolean {
    return this.expiresAt < now;
  }
}
