import { pool } from '@/database';
import { Barber } from './Barber';
import { BarberRepository } from './BarberRepository';

export class PostgresBarberRepository implements BarberRepository {
  async save(barber: Barber) {
    const client = await pool.connect();

    const sql = 'INSERT INTO barbers VALUES ($1, $2, $3, $4)';
    const params = Object.values(barber);

    await client.query(sql, params);

    client.release();
  }
}
