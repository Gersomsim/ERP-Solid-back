import { SaleStatus } from '@features/sales/sale/domain';

export class FindAllSalesQuery {
  constructor(
    public readonly tenantId: string,
    public readonly page?: number,
    public readonly limit?: number,
    public readonly search?: string,
    public readonly status?: SaleStatus,
    public readonly customerId?: string,
    public readonly saleAgentId?: string,
  ) {}
}
