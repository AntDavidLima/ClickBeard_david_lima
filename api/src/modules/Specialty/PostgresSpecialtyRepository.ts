import { pool } from '@/database';
import { Specialty } from './Specialty';
import { SpecialtyRepository } from './SpecialtyRepository';
import { UnableToPersistDataError } from '@/Errors/UnableToPersistDataError';

export class PostgresSpecialtyRepotitory implements SpecialtyRepository {
  async save(specialty: Specialty) {
    const client = await pool.connect();
      
    const sql = 'INSERT INTO specialties VALUES ($1, $2)';
    const params = Object.values(specialty);

    try {
      await client.query(sql, params);
    
      const result = await client.query('SELECT * FROM specialties WHERE id = $1', [specialty.id]);
      
      return result.rows[0];
    } catch (error) {
      throw new UnableToPersistDataError(error as Error);
    } finally {
      client.release();
    }
  }
}