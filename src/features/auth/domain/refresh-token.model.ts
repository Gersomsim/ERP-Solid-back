export class RefreshToken {
  constructor(
    public readonly jti: string,
    public readonly userId: string,
    public readonly expiresAt: Date,
    public readonly revokedAt: Date | null,
    public readonly ipAddress: string | null,
    public readonly userAgent: string | null,
  ) {}

  get isRevoked(): boolean {
    return this.revokedAt !== null;
  }

  get isExpired(): boolean {
    return new Date() > this.expiresAt;
  }

  static create(
    jti: string,
    userId: string,
    expiresInDays: number,
    ipAddress?: string,
    userAgent?: string,
  ): RefreshToken {
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + expiresInDays);
    return new RefreshToken(
      jti,
      userId,
      expiresAt,
      null,
      ipAddress ?? null,
      userAgent ?? null,
    );
  }
}
