import { Specialty } from './Specialty';

export interface SpecialtyRepository {
  save(specialty: Specialty): Promise<Specialty>

  findByName(name: string): Promise<Specialty>
}