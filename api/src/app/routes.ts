import { FastifyInstance } from 'fastify';

import * as BarberController from '@/modules/Barber/BarberController';
import * as SpecialtyController from '@/modules/Specialty/SpecialtyController';
import * as SpecializationController from '@/modules/Specialization/SpecializationController';
import * as UserController from '@/modules/User/UserController';
import * as UserAuthenticationController from '@/modules/User/UserAuthenticationController';
import { veryfyJWT } from './plugins/verify-jwt';

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', UserController.save);
  app.post('/users/session', UserAuthenticationController.authenticate);

  app.post('/barbers', { onRequest: [veryfyJWT] }, BarberController.save);

  app.post('/specialties', { onRequest: [veryfyJWT] }, SpecialtyController.save);

  app.post('/specializations', { onRequest: [veryfyJWT] }, SpecializationController.save);
}