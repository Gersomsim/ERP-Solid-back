import { HttpExceptionFilter } from '@core/filters/http-exception.filter';
import { ResponseInterceptor } from '@core/interceptors/response.interceptor';
import { CorrelationIdMiddleware } from '@core/middlewares';
import { AuthModule } from '@features/auth/infra/auth.module';
import { ProfileModule } from '@features/profile/infra/profile.module';
import { SaleModule } from '@features/sales/sale/infra/sale.module';
import { TenantModule } from '@features/tenant/infra/tenant.module';
import { TokenModule } from '@features/token/infra/token.module';
import { UserModule } from '@features/user/infra/user.module';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { DatabaseModule } from './core/database/database.module';
import { MailerModule } from './core/mailer/mailer.module';
import { PaymentMethodModule } from './features/finance/payment-method/infra/payment-method.module';
import { PermissionModule } from './features/permission/infra/permission.module';
import { RoleModule } from './features/role/infra/role.module';
import { CustomerModule } from './features/sales/customer/infra/customer.module';
import { SaleAgentModule } from './features/sales/sale-agent/infra/sale-agent.module';
import { SalePaymentModule } from './features/sales/sale-payment/infra/sale-payment.module';
import { ProductModule } from './features/products/product/product.module';
import { ProductSalesDataModule } from './features/sales/product-sales-data/product-sales-data.module';

@Module({
  imports: [
    PermissionModule,
    DatabaseModule,
    AuthModule,
    ProfileModule,
    TenantModule,
    UserModule,
    TokenModule,
    MailerModule,
    RoleModule,
    CustomerModule,
    SaleAgentModule,
    SaleModule,
    SalePaymentModule,
    PaymentMethodModule,
    ProductModule,
    ProductSalesDataModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
  ],
  exports: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CorrelationIdMiddleware).forRoutes('*');
  }
}
