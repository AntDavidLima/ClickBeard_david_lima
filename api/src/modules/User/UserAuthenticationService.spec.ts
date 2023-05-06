import { beforeEach, describe, expect, it } from 'vitest';
import { randomUUID } from 'crypto';
import { hash } from 'bcrypt';

import { InMemoryUserRepository } from './InMemoryUserRepository';
import { UserAuthenticationService } from './UserAuthenticationService';
import { InvalidCredentialsError } from '@/Errors/InvalidCredentialsError';


let userRepository: InMemoryUserRepository;
let userAuthenticationService: UserAuthenticationService;

describe('User authentication service', () => {
  beforeEach(async () => {
    userRepository = new InMemoryUserRepository();
    userAuthenticationService = new UserAuthenticationService(userRepository);

    await userRepository.save({
      id: randomUUID(),
      name: 'Jon Doe',
      email: 'jon@doe.com',
      password_hash: await hash('123456', 6)
    });
  });

  it('should not authenticate a user with a wrong email', async () => {
    await expect(userAuthenticationService.authenticate({
      email: 'wrong@email.com',
      password: '123456'
    })).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it('should not authenticate a user with a wrong password', async () => {
    await expect(userAuthenticationService.authenticate({
      email: 'jon@doe.com',
      password: 'wrongpassword'
    })).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it('should return the user when authenticating with correct credentials', async () => {
    const result  = await userAuthenticationService.authenticate({
      email: 'jon@doe.com',
      password: '123456'
    });

    expect(result).toBeTruthy();
  });
});