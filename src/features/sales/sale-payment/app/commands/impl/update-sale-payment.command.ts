export class UpdateSalePaymentCommand {
  constructor(
    public readonly id: string,
    public readonly amount?: number,
    public readonly date?: Date,
    public readonly reference?: string,
    public readonly paymentMethodId?: string,
  ) {}
}
