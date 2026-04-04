export class ExternalServiceException extends Error {
  constructor(message?: string) {
    super(message || 'External service error');
    this.name = 'ExternalServiceException';
  }
}
