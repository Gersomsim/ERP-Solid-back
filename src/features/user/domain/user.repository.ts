import { User } from './user.model';

export interface IUserRepository {
  findById(id: string): Promise<User | null>;
}
