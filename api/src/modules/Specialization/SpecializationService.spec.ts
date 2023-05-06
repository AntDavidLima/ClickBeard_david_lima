import { UUID, randomUUID } from 'crypto';
import { describe, expect, it } from 'vitest';

import { ResourceAlreadyExistsError } from '@/Errors/ResourceAlreadyExistsError';
import { InMemorySpecializationRepository } from './InMemorySpecializationRepository';
import { SpecializationService } from './SpecializationService';
import { Barber } from '../Barber/Barber';
import { Specialty } from '../Specialty/Specialty';

describe('Specialization service', () => {
  it('should not allow a barber to have the same specialty more than one time', async () => {
    const specializationRepository = new InMemorySpecializationRepository();

    const mockBarberRepository = {
      async findById(id: UUID) {
        return {
          id,
          name: 'Jon Doe',
          age: 18,
          hiring_date: new Date()
        };
      },
      async save(barber: Barber) {
        return barber;
      }
    };

    const mockSpecialtyRepository = {
      async findById(id: UUID) {
        return {
          id,
          name: 'Barba',
        };
      },
      async findByName(name: string) {
        return {
          id: randomUUID(),
          name,
        };
      },
      async save(specialty: Specialty) {
        return specialty;
      }
    };

    const specializationService = new SpecializationService(specializationRepository, mockBarberRepository, mockSpecialtyRepository);

    const barber_id = randomUUID();
    const specialty_id = randomUUID();

    await specializationService.save({
      barber_id,
      specialty_id
    });

    await expect(() => specializationService.save({
      barber_id,
      specialty_id
    })).rejects.toBeInstanceOf(ResourceAlreadyExistsError);
  });
});