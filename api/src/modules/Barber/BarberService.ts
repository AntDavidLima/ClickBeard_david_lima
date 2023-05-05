import { randomUUID } from 'crypto';

import { Barber } from './Barber';
import { create } from './BarberRepository';

export function save(barber: Omit<Barber, 'id'>) {
  const params = {
    id: randomUUID(),
    ...barber
  };

  create(params);
}