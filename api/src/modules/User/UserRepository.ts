import { User } from './User';

export interface UserRepository {
  save(user: User): void;

  findByEmail(email: string): Promise<User | null>;
}
