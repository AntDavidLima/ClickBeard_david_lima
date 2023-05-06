import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { PostgresSpecialtyRepotitory } from './PostgresSpecialtyRepository';
import { SpecialtyService } from './SpecialtyService';
import { UnableToPersistDataError } from '@/Errors/UnableToPersistDataError';

export async function save(request: FastifyRequest, reply: FastifyReply) {
  const bodySchema = z.object({
    name: z.string(),
  });

  try {
    const body = bodySchema.parse(request.body);

    const specialtyRepository = new PostgresSpecialtyRepotitory();
    const specialtyService = new SpecialtyService(specialtyRepository);

    const specialty = await specialtyService.save(body);

    return reply.status(201).send(specialty);
  } catch (error) {
    if (error instanceof UnableToPersistDataError) {
      return reply.status(500).send({ message: error.message });
    }

    throw error;
  }
}