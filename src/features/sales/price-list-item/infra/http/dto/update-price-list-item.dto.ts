import { IsNumber, IsOptional, Min } from 'class-validator';

export class UpdatePriceListItemDto {
  @IsNumber()
  @Min(0)
  @IsOptional()
  price?: number;

  @IsNumber()
  @Min(1)
  @IsOptional()
  minQuantity?: number;
}
