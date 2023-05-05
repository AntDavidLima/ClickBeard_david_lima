import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

import { save } from './BarberService';

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const bodySchema = z.object({
    name: z.string(),
    age: z.number().positive().int(),
    hiring_date: z.coerce.date()
  });

  const body = bodySchema.parse(request.body);

  save(body);

  return reply.status(201).send();
}