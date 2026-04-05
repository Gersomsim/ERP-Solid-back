import { SaleStatus } from './sale-status.enum';

export class Sale {
  id: string;
  tenantId: string;
  customerId: string;
  saleAgentId: string;
  folio: string;
  saleDate: Date;
  subtotal: number;
  tax: number;
  discount: number;
  total: number;
  status: SaleStatus;
  paymentTermId: string | null;

  constructor() {}

  static create(
    tenantId: string,
    customerId: string,
    saleAgentId: string,
    folio: string,
    saleDate: Date,
    subtotal: number,
    tax: number,
    discount: number,
    total: number,
    paymentTermId?: string | null,
  ): Sale {
    const sale = new Sale();
    sale.tenantId = tenantId;
    sale.customerId = customerId;
    sale.saleAgentId = saleAgentId;
    sale.folio = folio;
    sale.saleDate = saleDate;
    sale.subtotal = subtotal;
    sale.tax = tax;
    sale.discount = discount;
    sale.total = total;
    sale.status = SaleStatus.DRAFT;
    sale.paymentTermId = paymentTermId ?? null;
    return sale;
  }
}
