import { Pagination } from '@features/common/interfaces';
import { CommissionRule } from './commission-rule.model';

export interface ICommissionRuleRepository {
  create(rule: CommissionRule): Promise<CommissionRule>;
  findById(id: string): Promise<CommissionRule | null>;
  findActiveByAgentId(agentId: string, tenantId: string): Promise<CommissionRule | null>;
  findAll(params: FindAllCommissionRulesParams): Promise<Pagination<CommissionRule>>;
  update(rule: CommissionRule): Promise<CommissionRule>;
  delete(id: string): Promise<void>;
}

export interface FindAllCommissionRulesParams {
  tenantId: string;
  page?: number;
  limit?: number;
  agentId?: string;
}
