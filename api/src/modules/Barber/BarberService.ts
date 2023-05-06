import { randomUUID } from 'crypto';

import { Barber } from './Barber';
import { BarberRepository } from './BarberRepository';

export class BarberService {
  constructor (private barberRepository: BarberRepository) {}

  async save(barber: Omit<Barber, 'id'>) {
    const params = {
      id: randomUUID(),
      ...barber
    };

    return await this.barberRepository.save(params);
  }
}
