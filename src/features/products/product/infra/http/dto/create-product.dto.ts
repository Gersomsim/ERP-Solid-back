import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  sku: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsBoolean()
  @IsOptional()
  active?: boolean;

  @IsBoolean()
  @IsOptional()
  storable?: boolean;

  @IsBoolean()
  @IsOptional()
  sellable?: boolean;

  @IsBoolean()
  @IsOptional()
  buyable?: boolean;

  @IsBoolean()
  @IsOptional()
  service?: boolean;
}
