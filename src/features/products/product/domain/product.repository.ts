import { Pagination } from '@features/common/interfaces';
import { Product } from './product.model';

export interface IProductRepository {
  create(product: Product): Promise<Product>;
  findById(id: string): Promise<Product | null>;
  findAll(params: FindAllProductsParams): Promise<Pagination<Product>>;
  update(product: Product): Promise<Product>;
  delete(id: string): Promise<void>;
}

export interface FindAllProductsParams {
  tenantId: string;
  page?: number;
  limit?: number;
  search?: string;
}
