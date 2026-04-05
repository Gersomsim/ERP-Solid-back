export class PaymentTerm {
  id: string;
  tenantId: string;
  name: string;
  days: number;
  description: string;
  isActive: boolean;

  constructor() {}

  static create(
    tenantId: string,
    name: string,
    days: number,
    description: string,
  ): PaymentTerm {
    const term = new PaymentTerm();
    term.tenantId = tenantId;
    term.name = name;
    term.days = days;
    term.description = description;
    term.isActive = true;
    return term;
  }
}
