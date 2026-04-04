export class PersistenceException extends Error {
  constructor(message?: string) {
    super(message || 'Persistence error');
    this.name = 'PersistenceException';
  }
}
