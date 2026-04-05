import { IsBoolean, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class UpdateProductSaleDataDto {
  @IsNumber()
  @Min(0)
  @IsOptional()
  price?: number;

  @IsString()
  @IsOptional()
  taxType?: string;

  @IsBoolean()
  @IsOptional()
  isAvailableForSale?: boolean;
}
