import { describe, expect, it } from 'vitest';

import { SpecialtyService } from './SpecialtyService';
import { InMemorySpecialtyRepository } from './InMemorySpecialtyRepository';

describe('Specialty service', () => {
  it('Should generate a valid UUID for the specialty', async () => {
    const specialtyRepository = new InMemorySpecialtyRepository();
    const specialtyService = new SpecialtyService(specialtyRepository);

    const specialty = await specialtyService.save({ name: 'Barba' }); 

    expect(specialty).toHaveProperty('id');
    expect(specialty.id).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i);
  });
});