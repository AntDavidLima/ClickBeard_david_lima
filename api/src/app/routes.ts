import { FastifyInstance } from 'fastify';

import * as BarberController from '@/modules/Barber/BarberController';
import * as SpecialtyController from '@/modules/Specialty/SpecialtyController';
import * as SpecializationController from '@/modules/Specialization/SpecializationController';

export async function appRoutes(app: FastifyInstance) {
  app.post('/barbers', BarberController.save);

  app.post('/specialties', SpecialtyController.save);

  app.post('/specializations', SpecializationController.save);
}