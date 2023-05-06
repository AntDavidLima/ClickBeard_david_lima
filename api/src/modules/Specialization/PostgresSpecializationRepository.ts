import { UUID } from 'crypto';

import { Specialization } from './Specialization';
import { SpecializationRepository } from './SpecializationRepository';
import { pool } from '@/database';
import { UnableToAccessDatabaseError } from '@/Errors/UnableToAccessDatabaseError';

export class PostgresSpecializationRepository implements SpecializationRepository {
  async save(specialization: Specialization) {
    const client = await pool.connect();
      
    const sql = 'INSERT INTO specializations VALUES ($1, $2)';
    const params = Object.values(specialization);
  
    try {
      await client.query(sql, params);

      const result = await client.query('SELECT * FROM specializations WHERE barber_id = $1 AND specialty_id = $2', params);
      
      return result.rows[0];
    } catch (error) {
      throw new UnableToAccessDatabaseError(error as Error);
    } finally {
      client.release();
    }
  }

  async findBySpecialty(specialty_id: UUID) {
    const client = await pool.connect();
      
    const sql = 'SELECT * FROM specializations WHERE specialty_id = $1';
  
    try {
      const result = await client.query(sql, [specialty_id]);
      
      return result.rows;
    } catch (error) {
      throw new UnableToAccessDatabaseError(error as Error);
    } finally {
      client.release();
    }
  }
}