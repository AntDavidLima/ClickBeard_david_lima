import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

import { AppointmentByDayServiceFactory } from './AppointmentByDayServiceFactory';
import { UnableToAccessDatabaseError } from '@/Errors/UnableToAccessDatabaseError';

export async function index(request: FastifyRequest, reply: FastifyReply) {
  const querySchema = z.object({
    date: z.string(),
  });

  try {
    const query = querySchema.parse(request.query);

    const appointmentService = AppointmentByDayServiceFactory.make();

    const appointments = await appointmentService.index(query.date);

    return reply.status(201).send(appointments);
  } catch (error) {
    if (error instanceof UnableToAccessDatabaseError) {
      return reply.status(500).send({ message: error.message });
    }

    throw error;
  }
}
