import { UUID } from 'crypto';
import { User } from './User';

export interface UserRepository {
  save(user: User): Promise<User | null>;

  findByEmail(email: string): Promise<User | null>;

  findById(id: UUID): Promise<User | null>;
}
