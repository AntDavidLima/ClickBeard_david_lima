import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

import { UserAuthenticateServiceFactory } from './UserAuthenticateServiceFactory';
import { UnableToAccessDatabaseError } from '@/Errors/UnableToAccessDatabaseError';
import { InvalidCredentialsError } from '@/Errors/InvalidCredentialsError';

export async function authenticate(request: FastifyRequest, reply: FastifyReply) {
  const bodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6)
  });

  try {
    const body = bodySchema.parse(request.body);

    const userAuthenticateService = UserAuthenticateServiceFactory.make();

    const user = await userAuthenticateService.authenticate(body);

    const token = await reply.jwtSign({}, {
      sign: {
        sub: user.id
      }
    });

    return reply.status(200).send({ token });
  } catch (error) {
    if (error instanceof UnableToAccessDatabaseError) {
      return reply.status(500).send({ message: error.message });
    }

    if (error instanceof InvalidCredentialsError) {
      return reply.status(401).send({ message: error.message });
    }

    throw error;
  }
}