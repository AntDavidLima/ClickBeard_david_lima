import { AppointmentService } from './AppointmentService';
import { PostgresAppointmentRepository } from './PostgresAppointmentRepository';

export class AppointmentServiceFactory {
  static make() {
    const appointmentRepository = new PostgresAppointmentRepository();
    const appointmentService = new AppointmentService(appointmentRepository);

    return appointmentService;
  }
}