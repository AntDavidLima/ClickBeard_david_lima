import fastify from 'fastify';
import { z } from 'zod';
import { pool } from './database';
import { randomUUID } from 'crypto';

export const app = fastify();

app.post('/barbers', async (request, reply) => {
  const registerBodySchema = z.object({
    name: z.string(),
    age: z.number().positive().int(),
    hiring_date: z.coerce.date()
  });

  const body = registerBodySchema.parse(request.body);

  const client = await pool.connect();

  const query = 'INSERT INTO barbers VALUES ($1, $2, $3, $4)';
  const params = Object.values(body);

  const { rows } = await client.query(query, [randomUUID(), ...params]);

  console.log(rows);

  client.release();

  return reply.status(201).send();
});
