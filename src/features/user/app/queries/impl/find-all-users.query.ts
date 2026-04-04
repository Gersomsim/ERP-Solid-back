export class FindAllUsersQuery {
  constructor(
    public readonly tenantId?: string,
    public readonly page?: number,
    public readonly limit?: number,
    public readonly search?: string,
    public readonly isActive?: boolean,
  ) {}
}
