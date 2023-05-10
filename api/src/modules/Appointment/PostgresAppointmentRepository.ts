import { UUID } from 'crypto';

import { Appointment } from './Appointment';
import { AppointmentRepository } from './AppointmentRepository';
import { pool } from '@/database';
import { UnableToAccessDatabaseError } from '@/Errors/UnableToAccessDatabaseError';
import moment from 'moment';

export class PostgresAppointmentRepository implements AppointmentRepository {
  async findByDay(day: string) {
    const client = await pool.connect();

    const sql = 'SELECT * FROM appointments WHERE appointment_time::date = $1';

    try {
      const result = await client.query(sql, [
        moment(day).format('YYYY-MM-DD'),
      ]);

      return result.rows;
    } catch (error) {
      throw new UnableToAccessDatabaseError(error as Error);
    } finally {
      client.release();
    }
  }

  async save(appointment: Appointment) {
    const client = await pool.connect();

    const sql = 'INSERT INTO appointments VALUES ($1, $2, $3, $4, $5)';
    const params = Object.values(appointment);

    try {
      await client.query(sql, params);

      const result = await client.query(
        'SELECT * FROM appointments WHERE id = $1',
        [appointment.id]
      );

      return result.rows[0];
    } catch (error) {
      throw new UnableToAccessDatabaseError(error as Error);
    } finally {
      client.release();
    }
  }

  async destroy(id: UUID) {
    const client = await pool.connect();

    const sql = 'DELETE FROM appointments  WHERE id = $1 RETURNING *';

    try {
      const result = await client.query(sql, [id]);

      return result.rows[0] ?? null;
    } catch (error) {
      throw new UnableToAccessDatabaseError(error as Error);
    } finally {
      client.release();
    }
  }

  async findById(id: UUID) {
    const client = await pool.connect();

    const sql = 'SELECT * FROM appointments WHERE id = $1';

    try {
      const result = await client.query(sql, [id]);

      return result.rows[0] ?? null;
    } catch (error) {
      throw new UnableToAccessDatabaseError(error as Error);
    } finally {
      client.release();
    }
  }

  async findByBarberAndAppointmentTimeBetween(
    barberId: UUID,
    startTime: Date,
    duration: number
  ) {
    const client = await pool.connect();

    // const sql = 'SELECT (appointment_time, appointment_time + INTERVAL \'$1 minutes\') OVERLAPS ( $2, $3 + INTERVAL \'$4 minutes\') FROM appointments WHERE barber_id = $5';
    // eslint-disable-next-line quotes
    const sql =
      'SELECT (appointment_time, appointment_time + $1::interval) OVERLAPS ($2::timestamp, $2 + $1::interval) FROM appointments WHERE barber_id = $3';

    try {
      const params = [`'${duration} minutes'`, startTime, barberId];
      const result = await client.query(sql, params);

      return result.rows[0]?.overlaps;
    } catch (error) {
      throw new UnableToAccessDatabaseError(error as Error);
    } finally {
      client.release();
    }
  }
}
