import { FastifyInstance } from 'fastify';
import { veryfyJWT } from './plugins/verify-jwt';

import * as BarberController from '@/modules/Barber/BarberController';
import * as SpecialtyController from '@/modules/Specialty/SpecialtyController';
import * as SpecializationController from '@/modules/Specialization/SpecializationController';
import * as UserController from '@/modules/User/UserController';
import * as UserAuthenticationController from '@/modules/User/UserAuthenticationController';
import * as AppointmentController from '@/modules/Appointment/AppointmentController';
import * as AppointmentByDayController from '@/modules/Appointment/AppointmentByDayController';

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', UserController.save);
  app.post('/users/session', UserAuthenticationController.authenticate);

  app.get('/users', { onRequest: [veryfyJWT] }, UserController.show);

  app.post('/barbers', { onRequest: [veryfyJWT] }, BarberController.save);
  app.get('/barbers', { onRequest: [veryfyJWT] }, BarberController.index);

  app.post(
    '/specialties',
    { onRequest: [veryfyJWT] },
    SpecialtyController.save
  );
  app.get(
    '/specialties',
    { onRequest: [veryfyJWT] },
    SpecialtyController.index
  );

  app.post(
    '/specializations',
    { onRequest: [veryfyJWT] },
    SpecializationController.save
  );

  app.post(
    '/appointments',
    { onRequest: [veryfyJWT] },
    AppointmentController.save
  );

  app.get(
    '/appointments/date',
    { onRequest: [veryfyJWT] },
    AppointmentByDayController.index
  );

  app.delete(
    '/appointments',
    { onRequest: [veryfyJWT] },
    AppointmentController.destroy
  );
}
