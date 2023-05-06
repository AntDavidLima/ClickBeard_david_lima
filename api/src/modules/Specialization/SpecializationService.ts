import { ResourceNotFoundError } from '@/Errors/ResourceNotFoudError';
import { BarberRepository } from '../Barber/BarberRepository';
import { SpecialtyRepository } from '../Specialty/SpecialtyRepository';
import { Specialization } from './Specialization';
import { SpecializationRepository } from './SpecializationRepository';
import { ResourceAlreadyExistsError } from '@/Errors/ResourceAlreadyExistsError';

export class SpecializationService {
  constructor (
    private specializationRepository: SpecializationRepository,
    private barberRepository: BarberRepository,
    private specialtyRepository: SpecialtyRepository
  ) {}

  async save(specialization: Specialization) {
    const barberExists = await this.barberRepository.findById(specialization.barber_id);

    if (!barberExists) {
      throw new ResourceNotFoundError('The barber you entered does not exist.');
    }

    const specialtyExists = await this.specialtyRepository.findById(specialization.specialty_id);

    if (!specialtyExists) {
      throw new ResourceNotFoundError('The specialty you entered does not exist.');
    }

    const barbersWithThisSpecialty = await this.specializationRepository.findBySpecialty(specialization.specialty_id);

    if (barbersWithThisSpecialty.find(barber => barber.barber_id === specialization.barber_id)) {
      throw new ResourceAlreadyExistsError('This barber already has this specialization');
    }

    return this.specializationRepository.save(specialization);
  }
}