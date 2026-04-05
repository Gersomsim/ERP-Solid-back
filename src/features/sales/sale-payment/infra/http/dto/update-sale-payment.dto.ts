import { IsDateString, IsNumber, IsOptional, IsUUID, Min } from 'class-validator';

export class UpdateSalePaymentDto {
  @IsNumber()
  @Min(0)
  @IsOptional()
  amount?: number;

  @IsDateString()
  @IsOptional()
  date?: string;

  @IsOptional()
  reference?: string;

  @IsUUID()
  @IsOptional()
  paymentMethodId?: string;
}
