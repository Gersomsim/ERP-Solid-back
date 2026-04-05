import {
  CreateCommissionRuleHandler,
  DeleteCommissionRuleHandler,
  UpdateCommissionRuleHandler,
} from '@features/sales/commission-rule/app/commands';
import {
  FindAllCommissionRulesHandler,
  FindCommissionRuleHandler,
} from '@features/sales/commission-rule/app/queries';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommissionRuleController } from './http/commission-rule.controller';
import { CommissionRuleEntity, CommissionRuleProvider } from './persistence';

@Module({
  imports: [TypeOrmModule.forFeature([CommissionRuleEntity]), CqrsModule],
  controllers: [CommissionRuleController],
  providers: [
    CommissionRuleProvider,
    CreateCommissionRuleHandler,
    UpdateCommissionRuleHandler,
    DeleteCommissionRuleHandler,
    FindAllCommissionRulesHandler,
    FindCommissionRuleHandler,
  ],
  exports: [TypeOrmModule],
})
export class CommissionRuleModule {}
