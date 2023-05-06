import { PostgresUserRepository } from './PostgresUserRepository';
import { UserService } from './UserService';

export class UserSerticeFactory {
  static make() {
    const userRepository = new PostgresUserRepository();
    const userService = new UserService(userRepository);

    return userService;
  }
}