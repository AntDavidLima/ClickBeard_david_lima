import { UUID } from 'crypto';

import { Barber } from './Barber';
import { BarberRepository } from './BarberRepository';

export class InMemoryBarberRepository implements BarberRepository {
  private barbers: Barber[] = [];

  async findAll() {
    return this.barbers;
  }

  async findById(id: UUID) {
    return this.barbers.find((barber) => barber.id === id) ?? null;
  }

  async save(barber: Barber) {
    this.barbers.push(barber);

    return barber;
  }
}
