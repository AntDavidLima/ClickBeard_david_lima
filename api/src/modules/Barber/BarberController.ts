import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

import { BarberService } from './BarberService';
import { PostgresBarberRepository } from './PostgresBarberRepository';

export async function save(request: FastifyRequest, reply: FastifyReply) {
  const bodySchema = z.object({
    name: z.string(),
    age: z.number().positive().int(),
    hiring_date: z.coerce.date()
  });

  const body = bodySchema.parse(request.body);

  const barberRepository = new PostgresBarberRepository();
  const barberService = new BarberService(barberRepository);

  barberService.save(body);

  return reply.status(201).send();
}