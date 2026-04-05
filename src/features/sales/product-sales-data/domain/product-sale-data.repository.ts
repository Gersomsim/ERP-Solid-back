import { Pagination } from '@features/common/interfaces';
import { ProductSaleData } from './product-sale-data.model';
import { ProductSaleDataView } from './product-sale-data.view';

export interface IProductSaleDataRepository {
  // write
  create(data: ProductSaleData): Promise<ProductSaleData>;
  update(data: ProductSaleData): Promise<ProductSaleData>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<ProductSaleData | null>;

  // read (with join)
  findAllView(
    params: FindAllProductSaleDataParams,
  ): Promise<Pagination<ProductSaleDataView>>;
  findViewById(id: string): Promise<ProductSaleDataView | null>;
}

export interface FindAllProductSaleDataParams {
  tenantId: string;
  page?: number;
  limit?: number;
  search?: string;
  isAvailableForSale?: boolean;
}
