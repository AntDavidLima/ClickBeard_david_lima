import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

import { ResourceAlreadyExistsError } from '@/Errors/ResourceAlreadyExistsError';
import { UnableToAccessDatabaseError } from '@/Errors/UnableToAccessDatabaseError';
import { SpecialtyServiceFactory } from './SpecialtyServiceFactory';

export async function save(request: FastifyRequest, reply: FastifyReply) {
  const bodySchema = z.object({
    name: z.string(),
  });

  try {
    const body = bodySchema.parse(request.body);

    const specialtyService = SpecialtyServiceFactory.make();

    const specialty = await specialtyService.save(body);

    return reply.status(201).send(specialty);
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