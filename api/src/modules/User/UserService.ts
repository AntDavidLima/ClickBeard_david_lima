import { randomUUID } from 'crypto';
import bcrypt from 'bcrypt';

import { UserRepository } from './UserRepository';
import { ResourceAlreadyExistsError } from '@/Errors/ResourceAlreadyExistsError';

interface User {
  name: string
  email: string
  password: string
}

export class UserService {
  constructor (private userRepository: UserRepository) {}

  async save(user: User) {
    const userExists = await this.userRepository.findByEmail(user.email);

    if (userExists) {
      throw new ResourceAlreadyExistsError('This e-mail is already in use');
    }

    const { password, ...userInfo } = user;

    const params = {
      id: randomUUID(),
      ...userInfo,
      password_hash: await bcrypt.hash(password, 6),
    };

    return this.userRepository.save(params);
  }
}