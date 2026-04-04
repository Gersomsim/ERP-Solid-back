export class EntityNotFoundException extends Error {
  constructor(entity: string, id: string) {
    super(`${entity} not found with id: ${id}`);
    this.name = 'EntityNotFoundException';
  }
}
