import { describe, expect, it } from 'vitest';
import { compare } from 'bcrypt';

import { ResourceAlreadyExistsError } from '@/Errors/ResourceAlreadyExistsError';
import { InMemoryUserRepository } from './InMemoryUserRepository';
import { UserService } from './UserService';

describe('User service', () => {
  it('should generate a valid UUID for the user', async () => {
    const userRepository = new InMemoryUserRepository();
    const userService = new UserService(userRepository);

    const user = await userService.save({
      name: 'Jon Doe',
      email: 'jon@doe.com',
      password: '123456'
    });

    expect(user).toHaveProperty('id');
    expect(user.id).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i);
  });

  it('should not allow multiple users with the same email', async () => {
    const userRepository = new InMemoryUserRepository();
    const userService = new UserService(userRepository);

    await userService.save({
      name: 'Jon Doe',
      email: 'jon@doe.com',
      password: '123456'
    });

    await expect(() => userService.save({
      name: 'Jon Doe',
      email: 'jon@doe.com',
      password: '123456'
    })).rejects.toBeInstanceOf(ResourceAlreadyExistsError);
  });

  it('should hash the user password', async () => {
    const userRepository = new InMemoryUserRepository();
    const userService = new UserService(userRepository);

    const password = '123456';

    const user = await userService.save({
      name: 'Jon Doe',
      email: 'jon@doe.com',
      password
    });

    expect(await compare(password, user.password_hash));
  });
});