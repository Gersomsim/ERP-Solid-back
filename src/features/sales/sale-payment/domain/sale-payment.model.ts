export class SalePayment {
  id: string;
  saleId: string;
  amount: number;
  date: Date;
  reference: string;
  paymentMethodId: string;

  constructor() {}

  static create(
    saleId: string,
    amount: number,
    date: Date,
    reference: string,
    paymentMethodId: string,
  ): SalePayment {
    const payment = new SalePayment();
    payment.saleId = saleId;
    payment.amount = amount;
    payment.date = date;
    payment.reference = reference;
    payment.paymentMethodId = paymentMethodId;
    return payment;
  }
}
