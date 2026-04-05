import { SaleStatus } from '@features/sales/sale/domain';
import {
  IsDateString,
  IsEnum,
  IsNumber,
  IsOptional,
  IsUUID,
  Min,
} from 'class-validator';

export class UpdateSaleDto {
  @IsUUID()
  @IsOptional()
  customerId?: string;

  @IsUUID()
  @IsOptional()
  saleAgentId?: string;

  @IsOptional()
  folio?: string;

  @IsDateString()
  @IsOptional()
  saleDate?: string;

  @IsNumber()
  @Min(0)
  @IsOptional()
  subtotal?: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  tax?: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  discount?: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  total?: number;

  @IsEnum(SaleStatus)
  @IsOptional()
  status?: SaleStatus;

  @IsUUID()
  @IsOptional()
  paymentTermId?: string;
}
