export class ForbiddenResourceException extends Error {
  constructor(message?: string) {
    super(message || 'You do not have permission to access this resource');
    this.name = 'ForbiddenResourceException';
  }
}
