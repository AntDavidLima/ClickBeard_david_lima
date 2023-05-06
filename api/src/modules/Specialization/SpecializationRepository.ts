import { UUID } from 'crypto';
import { Specialization } from './Specialization';

export interface SpecializationRepository {
  save(specialization: Specialization): Promise<Specialization>

  findBySpecialty(specialty_id: UUID): Promise<Specialization[]>
}