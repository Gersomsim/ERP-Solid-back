import { Pagination } from '@features/common/interfaces';
import { SaleAgent } from './sale-agent.model';

export interface ISaleAgentRepository {
  create(agent: SaleAgent): Promise<SaleAgent>;
  findById(id: string): Promise<SaleAgent | null>;
  findAll(params: FindAllSaleAgentsParams): Promise<Pagination<SaleAgent>>;
  update(agent: SaleAgent): Promise<SaleAgent>;
  delete(id: string): Promise<void>;
}

export interface FindAllSaleAgentsParams {
  tenantId: string;
  page?: number;
  limit?: number;
  search?: string;
}
