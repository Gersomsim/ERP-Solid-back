import { Profile } from './profile.model';

export interface IProfileRepository {
  findByUserId(userId: string): Promise<Profile | null>;
  update(userId: string, profile: Profile): Promise<Profile>;
}
