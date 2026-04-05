import { IsDateString, IsNotEmpty, IsNumber, IsUUID, Min } from 'class-validator';

export class CreateSaleDto {
  @IsUUID()
  @IsNotEmpty()
  customerId: string;

  @IsUUID()
  @IsNotEmpty()
  saleAgentId: string;

  @IsNotEmpty()
  folio: string;

  @IsDateString()
  saleDate: string;

  @IsNumber()
  @Min(0)
  subtotal: number;

  @IsNumber()
  @Min(0)
  tax: number;

  @IsNumber()
  @Min(0)
  discount: number;

  @IsNumber()
  @Min(0)
  total: number;
}
