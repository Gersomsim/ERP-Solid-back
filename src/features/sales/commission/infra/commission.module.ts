import { CreateCommissionOnSaleConfirmedHandler } from '@features/sales/commission/app/events';
import {
  ApproveCommissionHandler,
  CancelCommissionHandler,
} from '@features/sales/commission/app/commands';
import {
  FindAllCommissionsHandler,
  FindCommissionHandler,
} from '@features/sales/commission/app/queries';
import { CommissionRuleEntity, CommissionRuleProvider } from '@features/sales/commission-rule/infra/persistence';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommissionController } from './http/commission.controller';
import { CommissionEntity, CommissionProvider } from './persistence';

@Module({
  imports: [
    TypeOrmModule.forFeature([CommissionEntity, CommissionRuleEntity]),
    CqrsModule,
  ],
  controllers: [CommissionController],
  providers: [
    CommissionProvider,
    CommissionRuleProvider,
    ApproveCommissionHandler,
    CancelCommissionHandler,
    FindAllCommissionsHandler,
    FindCommissionHandler,
    CreateCommissionOnSaleConfirmedHandler,
  ],
})
export class CommissionModule {}
