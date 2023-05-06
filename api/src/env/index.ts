import 'dotenv/config';
import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['dev', 'prod', 'test']).default('dev'),
  PORT: z.coerce.number().default(3333),
  DATABASE_USER: z.string().default('docker'),
  DATABASE_PASSWORD: z.string().default('docker'),
  DATABASE_HOST: z.string().default('localhost'),
  DATABASE_NAME: z.string().default('click-beard'),
  DATABASE_PORT: z.coerce.number().default(5432),
  DATABASE_SCHEMA: z.string().default('public')
});

const _env = envSchema.safeParse(process.env);

if (_env.success === false) {
  console.error('Invalid env variables', _env.error.format());

  throw new Error('Invalid env variable error');
}

export const env = _env.data;
