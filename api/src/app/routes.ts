import { FastifyInstance } from 'fastify';

import { create } from '@/modules/Barber/BarberController';

export async function appRoutes(app: FastifyInstance) {
  app.post('/barbers', create);
}