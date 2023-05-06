import { Specialty } from './Specialty';
import { SpecialtyRepository } from './SpecialtyRepository';

export class InMemorySpecialtyRepository implements SpecialtyRepository {
  private specialties: Specialty[] = [];

  async findByName(name: string) {
    const result = this.specialties.filter(specialty => specialty.name.toLowerCase === name.toLowerCase); 

    return result[0];
  }

  async save(specialty: Specialty) {
    this.specialties.push(specialty);

    return specialty;
  }

}