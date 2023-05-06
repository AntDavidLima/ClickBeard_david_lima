import { BarberService } from './BarberService';
import { PostgresBarberRepository } from './PostgresBarberRepository';

export class BarberServiceFactory {
  static make() {
    const barberRepository = new PostgresBarberRepository();
    const barberService = new BarberService(barberRepository);

    return barberService;
  }
}