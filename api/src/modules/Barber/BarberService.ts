import { randomUUID } from 'crypto';

import { Barber } from './Barber';
import { BarberRepository } from './BarberRepository';

export class BarberService {
  constructor (private barberRepository: BarberRepository) {}

  save(barber: Omit<Barber, 'id'>) {
    const params = {
      id: randomUUID(),
      ...barber
    };

    this.barberRepository.save(params);
  }
}
