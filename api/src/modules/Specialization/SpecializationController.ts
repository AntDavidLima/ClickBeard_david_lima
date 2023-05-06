import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

import { PostgresSpecializationRepository } from './PostgresSpecializationRepository';
import { SpecializationService } from './SpecializationService';
import { Specialization } from './Specialization';
import { UnableToAccessDatabaseError } from '@/Errors/UnableToAccessDatabaseError';
import { ResourceAlreadyExistsError } from '@/Errors/ResourceAlreadyExistsError';
import { PostgresBarberRepository } from '../Barber/PostgresBarberRepository';
import { PostgresSpecialtyRepotitory } from '../Specialty/PostgresSpecialtyRepository';
import { ResourceNotFoundError } from '@/Errors/ResourceNotFoudError';

export async function save(request: FastifyRequest, reply: FastifyReply) {
  const bodySchema = z.object({
    barber_id: z.string().uuid(),
    specialty_id: z.string().uuid()
  });

  try {
    const body = bodySchema.parse(request.body);

    const specializationRepository = new PostgresSpecializationRepository();
    const barberRepository = new PostgresBarberRepository();
    const specialtyRepository = new PostgresSpecialtyRepotitory();

    const specializationService = new SpecializationService(specializationRepository, barberRepository, specialtyRepository);

    const barber = await specializationService.save(body as Specialization);

    return reply.status(201).send(barber);
  } catch (error) {
    if (error instanceof UnableToAccessDatabaseError) {
      return reply.status(500).send({ message: error.message });
    }

    if (error instanceof ResourceAlreadyExistsError) {
      return reply.status(409).send({ message: error.message });
    }

    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: error.message });
    }

    throw error;
  }
}