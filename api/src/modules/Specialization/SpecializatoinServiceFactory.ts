import { PostgresBarberRepository } from '../Barber/PostgresBarberRepository';
import { PostgresSpecialtyRepository } from '../Specialty/PostgresSpecialtyRepository';
import { PostgresSpecializationRepository } from './PostgresSpecializationRepository';
import { SpecializationService } from './SpecializationService';

export class SpecializationServiceFactory {
  static make() {
    const specializationRepository = new PostgresSpecializationRepository();
    const barberRepository = new PostgresBarberRepository();
    const specialtyRepository = new PostgresSpecialtyRepository();
    const specializationService = new SpecializationService(specializationRepository, barberRepository, specialtyRepository);

    return specializationService;
  }
}