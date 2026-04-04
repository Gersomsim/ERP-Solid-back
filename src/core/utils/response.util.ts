import { PaginationMeta } from '@features/common/interfaces';

export class Response {
  static success<T>(
    data: T,
    message: string = '',
    pagination?: PaginationMeta,
  ): { message: string; data: T; pagination?: PaginationMeta } {
    return { message, data, pagination };
  }
}
