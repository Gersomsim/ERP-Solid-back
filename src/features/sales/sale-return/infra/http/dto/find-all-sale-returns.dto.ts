import { SaleReturnStatus } from '@features/sales/sale-return/domain';
import { IsEnum, IsNumber, IsOptional, IsUUID, Min } from 'class-validator';

export class FindAllSaleReturnsDto {
  @IsNumber()
  @Min(1)
  @IsOptional()
  page?: number;

  @IsNumber()
  @Min(1)
  @IsOptional()
  limit?: number;

  @IsEnum(SaleReturnStatus)
  @IsOptional()
  status?: SaleReturnStatus;

  @IsUUID()
  @IsOptional()
  saleId?: string;
}
