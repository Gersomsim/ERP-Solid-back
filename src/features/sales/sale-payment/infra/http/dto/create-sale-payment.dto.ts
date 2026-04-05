import { IsDateString, IsNotEmpty, IsNumber, IsUUID, Min } from 'class-validator';

export class CreateSalePaymentDto {
  @IsUUID()
  @IsNotEmpty()
  saleId: string;

  @IsNumber()
  @Min(0)
  amount: number;

  @IsDateString()
  date: string;

  @IsNotEmpty()
  reference: string;

  @IsUUID()
  @IsNotEmpty()
  paymentMethodId: string;
}
