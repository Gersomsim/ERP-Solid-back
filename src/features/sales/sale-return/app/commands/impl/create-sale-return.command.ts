import { SaleReturnResolution } from '@features/sales/sale-return/domain';

export class CreateSaleReturnCommand {
  constructor(
    public readonly saleId: string,
    public readonly tenantId: string,
    public readonly reason: string,
    public readonly resolutionType: SaleReturnResolution,
    public readonly notes?: string | null,
  ) {}
}
