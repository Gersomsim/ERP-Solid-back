import { Pagination } from '@features/common/interfaces';
import { Commission } from './commission.model';
import { CommissionStatus } from './commission-status.enum';

export interface ICommissionRepository {
  create(commission: Commission): Promise<Commission>;
  findById(id: string): Promise<Commission | null>;
  findAll(params: FindAllCommissionsParams): Promise<Pagination<Commission>>;
  findApprovedByAgentId(agentId: string, tenantId: string): Promise<Commission[]>;
  update(commission: Commission): Promise<Commission>;
}

export interface FindAllCommissionsParams {
  tenantId: string;
  page?: number;
  limit?: number;
  status?: CommissionStatus;
  agentId?: string;
  saleId?: string;
}
