import fastify from 'fastify';
import { ZodError } from 'zod';
import cors from '@fastify/cors';
import fastifyJwt from '@fastify/jwt';

import { appRoutes } from './routes';
import { env } from '@/env';

export const app = fastify();

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
});

app.register(appRoutes);

app.register(cors, {
  origin: true,
});

app.setErrorHandler((error, _request, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation error.', issues: error.format() });
  }

  if (env.NODE_ENV !== 'prod') {
    console.error(error);
  }

  return reply.status(500).send({ message: 'Internal server error. ' });
});
