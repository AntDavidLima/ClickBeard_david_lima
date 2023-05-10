import { UUID } from 'crypto';
import { User } from './User';
import { UserRepository } from './UserRepository';

export class InMemoryUserRepository implements UserRepository {
  private users: User[] = [];

  async findById(id: UUID) {
    return this.users.find((user) => user.id === id) ?? null;
  }

  async findByEmail(email: string) {
    return this.users.find((user) => user.email === email) ?? null;
  }

  async save(user: User) {
    this.users.push(user);

    return user;
  }
}
