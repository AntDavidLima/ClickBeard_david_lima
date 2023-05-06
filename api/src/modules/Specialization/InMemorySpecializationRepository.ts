import { UUID } from 'crypto';
import { Specialization } from './Specialization';
import { SpecializationRepository } from './SpecializationRepository';

export class InMemorySpecializationRepository implements SpecializationRepository {
  private specializations: Specialization[] = [];

  async findBySpecialty(specialty_id: UUID) {
    return this.specializations.filter(specialization => specialization.specialty_id === specialty_id);
  }

  async save(specialization: Specialization) {
    this.specializations.push(specialization);

    return specialization;
  }

}