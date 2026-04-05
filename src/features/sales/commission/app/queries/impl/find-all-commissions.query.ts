import { CommissionStatus } from '@features/sales/commission/domain';

export class FindAllCommissionsQuery {
  constructor(
    public readonly tenantId: string,
    public readonly page?: number,
    public readonly limit?: number,
    public readonly status?: CommissionStatus,
    public readonly agentId?: string,
    public readonly saleId?: string,
  ) {}
}
