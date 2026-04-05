export class CreateSalePaymentCommand {
  constructor(
    public readonly saleId: string,
    public readonly amount: number,
    public readonly date: Date,
    public readonly reference: string,
    public readonly paymentMethodId: string,
  ) {}
}
