export class BadRequestException extends Error {
  constructor(message?: string) {
    super(message || 'Bad request');
    this.name = 'BadRequestException';
  }
}
