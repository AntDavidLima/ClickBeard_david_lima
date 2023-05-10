import { AppointmentByDayService } from './AppointmentByDayService';
import { PostgresAppointmentRepository } from './PostgresAppointmentRepository';

export class AppointmentByDayServiceFactory {
  static make() {
    const appointmentRepository = new PostgresAppointmentRepository();
    const appointmentByDayService = new AppointmentByDayService(
      appointmentRepository
    );

    return appointmentByDayService;
  }
}
