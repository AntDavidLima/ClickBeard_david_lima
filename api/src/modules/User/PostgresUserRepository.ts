import { pool } from '@/database';
import { User } from './User';
import { UserRepository } from './UserRepository';
import { UnableToAccessDatabaseError } from '@/Errors/UnableToAccessDatabaseError';

export class PostgresUserRepository implements UserRepository {
  async save(user: User) {
    const client = await pool.connect();

    const sql = 'INSERT INTO users VALUES ($1, $2, $3, $4)';
    const params = Object.values(user);

    try {
      await client.query(sql, params);

      const { rows } = await client.query('SELECT * FROM users WHERE id = $1', [
        user.id,
      ]);

      return rows[0] ?? null;
    } catch (error) {
      throw new UnableToAccessDatabaseError(error as Error);
    } finally {
      client.release();
    }
  }

  async findByEmail(email: string) {
    const client = await pool.connect();

    const sql = 'SELECT * FROM users WHERE email = $1';
    const params = [email];

    try {
      const result = await client.query(sql, params);

      return result.rows[0] ?? null;
    } catch (error) {
      throw new UnableToAccessDatabaseError(error as Error);
    } finally {
      client.release();
    }
  }
}
