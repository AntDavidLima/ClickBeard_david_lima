import { pool } from '@/database';
import { Barber } from './Barber';
import { BarberRepository } from './BarberRepository';
import { UnableToPersistDataError } from '@/Errors/UnableToPersistDataError';

export class PostgresBarberRepository implements BarberRepository {
  async save(barber: Barber) {
    const client = await pool.connect();
      
    const sql = 'INSERT INTO barbers VALUES ($1, $2, $3, $4)';
    const params = Object.values(barber);

    try {
      await client.query(sql, params);
    } catch (error) {
      throw new UnableToPersistDataError(error as Error);
    } finally {
      client.release();
    }
  }
}
