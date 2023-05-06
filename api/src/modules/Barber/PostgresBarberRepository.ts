import { UUID } from 'crypto';

import { pool } from '@/database';
import { Barber } from './Barber';
import { BarberRepository } from './BarberRepository';
import { UnableToAccessDatabaseError } from '@/Errors/UnableToAccessDatabaseError';

export class PostgresBarberRepository implements BarberRepository {
  async findById(id: UUID) {
    const client = await pool.connect();
      
    const sql = 'SELECT * FROM barbers WHERE id = $1';

    try {
      const result = await client.query(sql, [id]);
    
      return result.rows[0] ?? null;
    } catch (error) {
      throw new UnableToAccessDatabaseError(error as Error);
    } finally {
      client.release();
    }
  }
  
  async save(barber: Barber) {
    const client = await pool.connect();
      
    const sql = 'INSERT INTO barbers VALUES ($1, $2, $3, $4)';
    const params = Object.values(barber);

    try {
      await client.query(sql, params);
    
      const result = await client.query('SELECT * FROM barbers WHERE id = $1', [barber.id]);
      
      return result.rows[0];
    } catch (error) {
      throw new UnableToAccessDatabaseError(error as Error);
    } finally {
      client.release();
    }
  }
}
