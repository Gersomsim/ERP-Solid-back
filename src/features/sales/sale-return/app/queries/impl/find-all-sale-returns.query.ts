import { SaleReturnStatus } from '@features/sales/sale-return/domain';

export class FindAllSaleReturnsQuery {
  constructor(
    public readonly tenantId: string,
    public readonly page?: number,
    public readonly limit?: number,
    public readonly status?: SaleReturnStatus,
    public readonly saleId?: string,
  ) {}
}
