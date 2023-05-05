import { Pool } from 'pg';

import { env } from '@/env';

export const pool = new Pool({
  user: env.DATABASE_USER,
  password: env.DATABASE_PASSWORD,
  database: env.DATABASE_NAME,
  host: env.DATABASE_HOST,
  port: env.DATABASE_PORT
});