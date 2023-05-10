import { UUID } from 'crypto';
import { Specialty } from './Specialty';

export interface SpecialtyRepository {
  save(specialty: Specialty): Promise<Specialty>;

  findByName(name: string): Promise<Specialty | null>;

  findById(id: UUID): Promise<Specialty | null>;

  findAll(): Promise<Specialty[]>;
}
