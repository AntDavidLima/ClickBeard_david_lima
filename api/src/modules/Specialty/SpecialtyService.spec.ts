import { describe, expect, it } from 'vitest';

import { SpecialtyService } from './SpecialtyService';
import { InMemorySpecialtyRepository } from './InMemorySpecialtyRepository';
import { ResourceAlreadyExistsError } from '@/Errors/ResourceAlreadyExistsError';
import { beforeEach } from 'node:test';

let specialtyRepository: InMemorySpecialtyRepository;
let specialtyService: SpecialtyService;

describe('Specialty service', () => {
  beforeEach(() => {
    specialtyRepository = new InMemorySpecialtyRepository();
    specialtyService = new SpecialtyService(specialtyRepository);
  });

  it('should generate a valid UUID for the specialty', async () => {
    const specialty = await specialtyService.save({ name: 'Barba' }); 

    expect(specialty).toHaveProperty('id');
    expect(specialty.id).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i);
  });

  it('should not allow two specialties with the same name', async () => {
    await specialtyService.save({ name: 'Barba' });

    await expect(() => specialtyService.save({ name: 'Barba' })).rejects.toBeInstanceOf(ResourceAlreadyExistsError);
  });
});