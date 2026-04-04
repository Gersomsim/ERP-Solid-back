import { Pagination } from '@features/common/interfaces';
import { User } from './user.model';

export interface IUserRepository {
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  create(user: User): Promise<User>;
  update(user: User, newPass?: string): Promise<User>;
  delete(id: string): Promise<void>;
  findAll(params: FindAllUsersParams): Promise<Pagination<User>>;
  validatePassword(password: string, hash: string): Promise<boolean>;
}

export interface FindAllUsersParams {
  tenantId?: string;
  page?: number;
  limit?: number;
  search?: string;
  isActive?: boolean;
}
