import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsUUID,
  Min,
} from 'class-validator';

export class CreatePriceListItemDto {
  @IsUUID()
  @IsNotEmpty()
  productSaleDataId: string;

  @IsNumber()
  @Min(0)
  price: number;

  @IsNumber()
  @Min(1)
  @IsOptional()
  minQuantity?: number = 1;
}
