import { Pagination } from '@features/common/interfaces';
import { SaleTarget } from './sale-target.model';
import { SaleTargetView } from './sale-target.view';

export interface ISaleTargetRepository {
  create(target: SaleTarget): Promise<SaleTarget>;
  findById(id: string): Promise<SaleTarget | null>;
  update(target: SaleTarget): Promise<SaleTarget>;
  delete(id: string): Promise<void>;

  findAllView(params: FindAllSaleTargetsParams): Promise<Pagination<SaleTargetView>>;
  findViewById(id: string): Promise<SaleTargetView | null>;
}

export interface FindAllSaleTargetsParams {
  tenantId: string;
  page?: number;
  limit?: number;
  agentId?: string;
}
