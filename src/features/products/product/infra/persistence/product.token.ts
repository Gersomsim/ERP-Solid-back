import { Provider } from '@nestjs/common';
import { TypeOrmProductRepository } from './typeorm-product.repository';

export const ProductToken = 'PRODUCT_TOKEN';

export const ProductProvider: Provider = {
  provide: ProductToken,
  useClass: TypeOrmProductRepository,
};
