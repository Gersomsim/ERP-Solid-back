export class UnauthorizedException extends Error {
  constructor(message?: string) {
    super(message || 'You do not have permission to perform this action');
    this.name = 'UnauthorizedException';
  }
}
