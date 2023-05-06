import { Barber } from './Barber';
import { BarberRepository } from './BarberRepository';

export class InMemoryBarberRepository implements BarberRepository {
  private barbers: Barber[] = [];

  async save(barber: Barber) {
    this.barbers.push(barber);

    return barber;
  }
}