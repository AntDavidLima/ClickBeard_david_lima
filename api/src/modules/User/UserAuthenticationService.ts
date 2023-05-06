import { compare } from 'bcrypt';

import { InvalidCredentialsError } from '@/Errors/InvalidCredentialsError';
import { UserRepository } from './UserRepository';

interface UserCredentials {
  email: string
  password: string
}

export class UserAuthenticationService {
  constructor (private userRepository: UserRepository) {}

  async authenticate(credentials: UserCredentials) {
    const userExists = await this.userRepository.findByEmail(credentials.email);

    if (!userExists) {
      throw new InvalidCredentialsError('Invalid credentials');
    }

    const passwordMatches = await compare(credentials.password, userExists.password_hash);

    if (!passwordMatches) {
      throw new InvalidCredentialsError('Invalid credentials');
    }

    return userExists;
  }
}