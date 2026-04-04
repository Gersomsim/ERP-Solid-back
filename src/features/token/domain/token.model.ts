export class Token {
  constructor(
    public readonly id: string,
    public readonly userId: string,
    public readonly selector: string,
    public readonly hashedToken: string,
    public readonly type: string,
    public readonly expiresAt: Date,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}

  static create(userId: string, type: string) {
    const selector = crypto.randomUUID();
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);
    const hashedToken = `${selector}.${crypto.randomUUID()}`;
    return new Token(
      crypto.randomUUID(),
      userId,
      selector,
      hashedToken,
      type,
      expiresAt,
      new Date(),
      new Date(),
    );
  }
}
