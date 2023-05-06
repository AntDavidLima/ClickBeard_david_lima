import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

import { UnableToAccessDatabaseError } from '@/Errors/UnableToAccessDatabaseError';
import { ResourceAlreadyExistsError } from '@/Errors/ResourceAlreadyExistsError';
import { UserSerticeFactory } from './UserServiceFactory';

export async function save(request: FastifyRequest, reply: FastifyReply) {
  const bodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6)
  });

  try {
    const body = bodySchema.parse(request.body);

    const userService = UserSerticeFactory.make();

    const user = await userService.save(body);

    return reply.status(201).send(user);
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