import { UUID } from 'crypto';

import { Barber } from './Barber';

export interface BarberRepository {
  save(barber: Barber): Promise<Barber>;

  findById(id: UUID): Promise<Barber | null>;

  findAll(): Promise<Barber[]>;
}
