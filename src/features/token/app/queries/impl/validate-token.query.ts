export class ValidateTokenQuery {
  constructor(
    public readonly token: string,
    public readonly type: string,
  ) {}
}
