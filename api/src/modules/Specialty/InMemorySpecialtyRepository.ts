import { Specialty } from './Specialty';
import { SpecialtyRepository } from './SpecialtyRepository';

export class InMemorySpecialtyRepository implements SpecialtyRepository {
  private specialties: Specialty[] = [];

  async save(specialty: Specialty) {
    this.specialties.push(specialty);

    return specialty;
  }

}