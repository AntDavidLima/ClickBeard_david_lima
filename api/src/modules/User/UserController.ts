import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

import { UnableToAccessDatabaseError } from '@/Errors/UnableToAccessDatabaseError';
import { ResourceAlreadyExistsError } from '@/Errors/ResourceAlreadyExistsError';
import { UserSerticeFactory } from './UserServiceFactory';
import { UserAuthenticateServiceFactory } from './UserAuthenticateServiceFactory';

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
