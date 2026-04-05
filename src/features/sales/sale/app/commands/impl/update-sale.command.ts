import { SaleStatus } from '@features/sales/sale/domain';

export class UpdateSaleCommand {
  constructor(
    public readonly id: string,
    public readonly customerId?: string,
    public readonly saleAgentId?: string,
    public readonly folio?: string,
    public readonly saleDate?: Date,
    public readonly subtotal?: number,
    public readonly tax?: number,
    public readonly discount?: number,
    public readonly total?: number,
    public readonly status?: SaleStatus,
  ) {}
}
