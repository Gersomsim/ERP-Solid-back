import { IsNotEmpty, IsNumber, IsUUID, Min } from 'class-validator';

export class CreateSaleItemDto {
  @IsUUID()
  @IsNotEmpty()
  saleId: string;

  @IsUUID()
  @IsNotEmpty()
  productId: string;

  @IsNumber()
  @Min(1)
  quantity: number;

  @IsNumber()
  @Min(0)
  unitPrice: number;

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
