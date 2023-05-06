import { randomUUID } from 'crypto';

import { Specialty } from './Specialty';
import { SpecialtyRepository } from './SpecialtyRepository';

export class SpecialtyService {
  constructor (private specialtyRepository: SpecialtyRepository) {}

  async save(specialty: Omit<Specialty, 'id'>) {
    const params = {
      id: randomUUID(),
      ...specialty
    };

    return await this.specialtyRepository.save(params);
  }
}