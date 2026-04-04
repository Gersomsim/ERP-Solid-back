import { User } from '@features/user/domain';

export interface LoginResponseDto {
  user: User;
  token: string;
  refreshToken: string;
}
