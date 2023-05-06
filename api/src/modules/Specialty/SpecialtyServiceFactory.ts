import { PostgresSpecialtyRepository } from './PostgresSpecialtyRepository';
import { SpecialtyService } from './SpecialtyService';

export class SpecialtyServiceFactory {
  static make() {
    const specialtyRepository = new PostgresSpecialtyRepository();
    const specialtyService = new SpecialtyService(specialtyRepository);

    return specialtyService;
  }
}