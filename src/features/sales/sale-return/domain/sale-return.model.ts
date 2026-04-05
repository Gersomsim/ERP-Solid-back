import { SaleReturnResolution } from './sale-return-resolution.enum';
import { SaleReturnStatus } from './sale-return-status.enum';

export class SaleReturn {
  id: string;
  saleId: string;
  tenantId: string;
  reason: string;
  status: SaleReturnStatus;
  resolutionType: SaleReturnResolution;
  notes: string | null;

  constructor() {}

  static create(
    saleId: string,
    tenantId: string,
    reason: string,
    resolutionType: SaleReturnResolution,
    notes?: string | null,
  ): SaleReturn {
    const saleReturn = new SaleReturn();
    saleReturn.saleId = saleId;
    saleReturn.tenantId = tenantId;
    saleReturn.reason = reason;
    saleReturn.status = SaleReturnStatus.PENDING;
    saleReturn.resolutionType = resolutionType;
    saleReturn.notes = notes ?? null;
    return saleReturn;
  }
}
