import { FastifyInstance } from 'fastify';

import { save } from '@/modules/Barber/BarberController';

export async function appRoutes(app: FastifyInstance) {
  app.post('/barbers', save);
}