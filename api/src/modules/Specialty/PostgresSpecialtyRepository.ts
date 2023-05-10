import { UUID } from 'crypto';

import { pool } from '@/database';
import { Specialty } from './Specialty';
import { SpecialtyRepository } from './SpecialtyRepository';
import { UnableToAccessDatabaseError } from '@/Errors/UnableToAccessDatabaseError';

export class PostgresSpecialtyRepository implements SpecialtyRepository {
  async findAll() {
    const client = await pool.connect();

    const sql = 'SELECT * FROM specialties';

    try {
      const result = await client.query(sql);

      return result.rows;
    } catch (error) {
      throw new UnableToAccessDatabaseError(error as Error);
    } finally {
      client.release();
    }
  }

  async findById(id: UUID) {
    const client = await pool.connect();

    const sql = 'SELECT * FROM specialties WHERE id = $1';

    try {
      const result = await client.query(sql, [id]);

      return result.rows[0] ?? null;
    } catch (error) {
      throw new UnableToAccessDatabaseError(error as Error);
    } finally {
      client.release();
    }
  }

  async findByName(name: string) {
    const client = await pool.connect();

    const sql = 'SELECT * FROM specialties WHERE LOWER(name) = LOWER($1)';

    try {
      const result = await client.query(sql, [name]);

      return result.rows[0] ?? null;
    } catch (error) {
      throw new UnableToAccessDatabaseError(error as Error);
    } finally {
      client.release();
    }
  }

  async save(specialty: Specialty) {
    const client = await pool.connect();

    const sql = 'INSERT INTO specialties VALUES ($1, $2)';
    const params = Object.values(specialty);

    try {
      await client.query(sql, params);

      const result = await client.query(
        'SELECT * FROM specialties WHERE id = $1',
        [specialty.id]
      );

      return result.rows[0];
    } catch (error) {
      throw new UnableToAccessDatabaseError(error as Error);
    } finally {
      client.release();
    }
  }
}
