import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

import { AppointmentServiceFactory } from './AppointmentServiceFactory';
import { Appointment } from './Appointment';
import { UnableToAccessDatabaseError } from '@/Errors/UnableToAccessDatabaseError';
import { AppointmentError } from '@/Errors/AppointmentError';
import { ResourceNotFoundError } from '@/Errors/ResourceNotFoudError';

export async function save(request: FastifyRequest, reply: FastifyReply) {
  const bodySchema = z.object({
    appointment_time: z.coerce.date(),
    specialty_id: z.string().uuid(),
    barber_id: z.string().uuid(),
  });

  try {
    const body = bodySchema.parse(request.body);

    await request.jwtVerify();

    const appointmentBody = {
      appointment_time: body.appointment_time,
      client_id: request.user.sub,
      specialty_id: body.specialty_id,
      barber_id: body.barber_id,
    };

    const appointmentService = AppointmentServiceFactory.make();

    const appointment = await appointmentService.save(
      appointmentBody as Appointment
    );

    return reply.status(201).send(appointment);
  } catch (error) {
    if (error instanceof UnableToAccessDatabaseError) {
      return reply.status(500).send({ message: error.message });
    }

    if (error instanceof AppointmentError) {
      return reply.status(400).send({ message: error.message });
    }

    throw error;
  }
}

export async function destroy(request: FastifyRequest, reply: FastifyReply) {
  const bodySchema = z.object({
    id: z.string().uuid(),
  });

  try {
    const body = bodySchema.parse(request.body);

    const appointmentService = AppointmentServiceFactory.make();

    const barber = await appointmentService.save(body as Appointment);

    return reply.status(201).send(barber);
  } catch (error) {
    if (error instanceof UnableToAccessDatabaseError) {
      return reply.status(500).send({ message: error.message });
    }

    if (error instanceof AppointmentError) {
      return reply.status(400).send({ message: error.message });
    }

    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: error.message });
    }

    throw error;
  }
}
