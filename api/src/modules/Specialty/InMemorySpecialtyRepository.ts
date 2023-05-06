import { UUID } from 'crypto';

import { Specialty } from './Specialty';
import { SpecialtyRepository } from './SpecialtyRepository';

export class InMemorySpecialtyRepository implements SpecialtyRepository {
  private specialties: Specialty[] = [];

  async findById(id: UUID) {
    return this.specialties.find(specialty => specialty.id === id) ?? null;
  }

  async findByName(name: string) {
    return this.specialties.find(specialty => specialty.name.toLowerCase === name.toLowerCase) ?? null; 
  }

  async save(specialty: Specialty) {
    this.specialties.push(specialty);

    return specialty;
  }

}