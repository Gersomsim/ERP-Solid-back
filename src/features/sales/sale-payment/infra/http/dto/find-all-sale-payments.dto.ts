import { IsNumber, IsOptional, IsUUID, Min } from 'class-validator';

export class FindAllSalePaymentsDto {
  @IsUUID()
  saleId: string;

  @IsNumber()
  @Min(1)
  @IsOptional()
  page?: number;

  @IsNumber()
  @Min(1)
  @IsOptional()
  limit?: number;
}
