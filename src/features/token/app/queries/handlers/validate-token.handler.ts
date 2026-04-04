import type { ITokenRepository } from '@features/token/domain';
import { HashToken } from '@features/token/infra/persistence';
import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ValidateTokenQuery } from '../impl/validate-token.query';

@QueryHandler(ValidateTokenQuery)
export class ValidateTokenHandler implements IQueryHandler<ValidateTokenQuery> {
  constructor(
    @Inject(HashToken)
    private readonly tokenRepository: ITokenRepository,
  ) {}

  async execute(query: ValidateTokenQuery): Promise<boolean> {
    const selector = query.token.split('.')[0];
    const token = await this.tokenRepository.findBySelector(selector);
    if (!token) {
      return false;
    }
    const now = new Date();
    if (token.expiresAt < now || token.type !== query.type) {
      return false;
    }
    return this.tokenRepository.validateToken(query.token, token.hashedToken!);
  }
}
