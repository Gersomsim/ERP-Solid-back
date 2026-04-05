import { SaleReturnResolution } from '@features/sales/sale-return/domain';
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateSaleReturnDto {
  @IsUUID()
  @IsNotEmpty()
  saleId: string;

  @IsString()
  @IsNotEmpty()
  reason: string;

  @IsEnum(SaleReturnResolution)
  resolutionType: SaleReturnResolution;

  @IsString()
  @IsOptional()
  notes?: string;
}
