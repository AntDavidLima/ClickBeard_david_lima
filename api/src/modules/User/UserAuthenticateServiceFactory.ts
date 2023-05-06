import { PostgresUserRepository } from './PostgresUserRepository';
import { UserAuthenticationService } from './UserAuthenticationService';

export class UserAuthenticateServiceFactory {
  static make() {
    const userRepository = new PostgresUserRepository();
    const userAuthenticateService = new UserAuthenticationService(userRepository);

    return userAuthenticateService;
  }
}