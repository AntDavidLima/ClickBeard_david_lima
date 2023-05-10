import { UUID, randomUUID } from 'crypto';
import moment from 'moment';

import { Appointment } from './Appointment';
import { AppointmentError } from '@/Errors/AppointmentError';
import { AppointmentRepository } from './AppointmentRepository';
import { ResourceNotFoundError } from '@/Errors/ResourceNotFoudError';

export class AppointmentService {
  constructor(private appointmentRepository: AppointmentRepository) {}

  async save(appointment: Omit<Appointment, 'id'>) {
    const barberShopOpeningTime = moment('08:00', 'HH:mm');
    const barberShopClosingTime = moment('18:00', 'HH:mm');

    const appointmentTime = moment(appointment.appointment_time, 'HH:mm');
    const hours = appointmentTime.hours();
    const minutes = appointmentTime.minutes();

    const shceduledTime = moment([hours, minutes], 'HH:mm');

    const afterBarberShopOpens = moment(shceduledTime).isSameOrAfter(
      barberShopOpeningTime,
      'minutes'
    );

    if (!afterBarberShopOpens) {
      throw new AppointmentError(
        'Barbershop is not open yet in the informed time'
      );
    }

    const beforeBarberShopCloses = moment(shceduledTime).isSameOrBefore(
      barberShopClosingTime,
      'minutes'
    );

    if (!beforeBarberShopCloses) {
      throw new AppointmentError(
        'Barbershop is not open yet in the informed time'
      );
    }

    const SERVICE_DURATION_IN_MINUTES = 30;

    const barberAppointmentsOverlaps =
      await this.appointmentRepository.findByBarberAndAppointmentTimeBetween(
        appointment.barber_id,
        appointment.appointment_time,
        SERVICE_DURATION_IN_MINUTES
      );

    if (barberAppointmentsOverlaps) {
      throw new AppointmentError(
        'Barber already has an appointment at this time'
      );
    }

    const params = {
      id: randomUUID(),
      ...appointment,
    };

    return await this.appointmentRepository.save(params);
  }

  async destroy(id: UUID) {
    const appointment = await this.appointmentRepository.findById(id);

    if (!appointment) {
      throw new ResourceNotFoundError('Appointment not found');
    }

    const appointmentTime = moment(appointment.appointment_time);

    const twoHoursBefore = appointmentTime.clone().subtract(2, 'hours');

    const isTwoHoursBeforeSchedule = moment().isSameOrBefore(twoHoursBefore);

    if (!isTwoHoursBeforeSchedule) {
      throw new AppointmentError(
        'You can only cancel appointments 2 hours before'
      );
    }

    return appointment;
  }
}
