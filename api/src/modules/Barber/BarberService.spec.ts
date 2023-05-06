import { describe, expect, it } from 'vitest';

import { BarberService } from './BarberService';
import { InMemoryBarberRepository } from './InMemoryBarberRepository';

describe('Barber service', () => {
  it('Should generate a valid UUID for the barber', async () => {
    const barberRepository = new InMemoryBarberRepository();
    const barberService = new BarberService(barberRepository);

    const barber = await barberService.save({
      name: 'Jon Doe',
      age: 18,
      hiring_date: new Date()
    });

    expect(barber).toHaveProperty('id');
    expect(barber.id).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i);
  });
});