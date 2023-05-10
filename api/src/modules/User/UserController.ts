import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

import { UnableToAccessDatabaseError } from '@/Errors/UnableToAccessDatabaseError';
import { ResourceAlreadyExistsError } from '@/Errors/ResourceAlreadyExistsError';
import { UserSerticeFactory } from './UserServiceFactory';
import { UserAuthenticateServiceFactory } from './UserAuthenticateServiceFactory';
import { UUID } from 'crypto';

export async function save(request: FastifyRequest, reply: FastifyReply) {
  const bodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  });

  try {
    const body = bodySchema.parse(request.body);

    const userService = UserSerticeFactory.make();

    await userService.save(body);

    const userAuthenticateService = UserAuthenticateServiceFactory.make();

    const user = await userAuthenticateService.authenticate(body);

    const token = await reply.jwtSign(
      {},
      {
        sign: {
          sub: user.id,
        },
      }
    );

    return reply.status(201).send({ token });
  } catch (error) {
    if (error instanceof UnableToAccessDatabaseError) {
      return reply.status(500).send({ message: error.message });
    }

    if (error instanceof ResourceAlreadyExistsError) {
      return reply.status(409).send({ message: error.message });
    }

    throw error;
  }
}

export async function show(request: FastifyRequest, reply: FastifyReply) {
  try {
    const userService = UserSerticeFactory.make();

    await request.jwtVerify();

    const user = await userService.show(request.user.sub as UUID);

    delete user?.password_hash;

    return reply.status(200).send(user);
  } catch (error) {
    if (error instanceof UnableToAccessDatabaseError) {
      return reply.status(500).send({ message: error.message });
    }

    throw error;
  }
}
