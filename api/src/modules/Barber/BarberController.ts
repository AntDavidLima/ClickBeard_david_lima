import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

import { BarberService } from './BarberService';
import { PostgresBarberRepository } from './PostgresBarberRepository';
import { UnableToPersistDataError } from '@/Errors/UnableToPersistDataError';

export async function save(request: FastifyRequest, reply: FastifyReply) {
  const bodySchema = z.object({
    name: z.string(),
    age: z.number().positive().int(),
    hiring_date: z.coerce.date()
  });

  try {
    const body = bodySchema.parse(request.body);

    const barberRepository = new PostgresBarberRepository();
    const barberService = new BarberService(barberRepository);

    const barber = await barberService.save(body);

    return reply.status(201).send(barber);
  } catch (error) {
    if (error instanceof UnableToPersistDataError) {
      return reply.status(500).send({ message: error.message });
    }

    throw error;
  }
}