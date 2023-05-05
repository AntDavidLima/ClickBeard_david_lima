import { Barber } from './Barber';

export interface BarberRepository {
  save(barber: Barber): void
}