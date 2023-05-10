import { AppointmentRepository } from './AppointmentRepository';

export class AppointmentByDayService {
  constructor(private appointmentRepository: AppointmentRepository) {}

  async index(day: string) {
    return await this.appointmentRepository.findByDay(day);
  }
}
