import { randomUUID } from 'crypto';

import { Specialty } from './Specialty';
import { SpecialtyRepository } from './SpecialtyRepository';
import { ResourceAlreadyExistsError } from '@/Errors/ResourceAlreadyExistsError';

export class SpecialtyService {
  constructor(private specialtyRepository: SpecialtyRepository) {}

  async save(specialty: Omit<Specialty, 'id'>) {
    const specialtyExists = await this.specialtyRepository.findByName(
      specialty.name
    );

    if (specialtyExists) {
      throw new ResourceAlreadyExistsError('This specialty already exists.');
    }

    const params = {
      id: randomUUID(),
      ...specialty,
    };

    return await this.specialtyRepository.save(params);
  }

  async index() {
    return await this.specialtyRepository.findAll();
  }
}
