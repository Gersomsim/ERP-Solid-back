import { Provider } from '@nestjs/common';
import { TypeOrmProductSaleDataRepository } from './typeorm-product-sale-data.repository';

export const ProductSaleDataToken = 'PRODUCT_SALE_DATA_TOKEN';

export const ProductSaleDataProvider: Provider = {
  provide: ProductSaleDataToken,
  useClass: TypeOrmProductSaleDataRepository,
};
