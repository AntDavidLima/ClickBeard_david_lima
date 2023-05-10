import { UUID } from 'crypto';

import { Appointment } from './Appointment';
import { AppointmentRepository } from './AppointmentRepository';
import moment from 'moment';

export class InMemoryAppointmentRepository implements AppointmentRepository {
  private appointments: Appointment[] = [];

  async findByDay(day: string) {
    return this.appointments.filter((appointment) => {
      return moment(appointment.appointment_time).isSame(day, 'day');
    });
  }

  async findByBarberAndAppointmentTimeBetween(
    barberId: UUID,
    startTime: Date,
    duration: number
  ) {
    const appointmentsAtThisTime = this.appointments.filter((appointment) => {
      const sameBarber = appointment.barber_id === barberId;

      const sameStartTime = moment(startTime).isSame(
        moment(appointment.appointment_time)
      );

      const appointmentTimeBetweenStartAndEndTime =
        moment(startTime).isBefore(moment(appointment.appointment_time)) &&
        moment(appointment.appointment_time).isBefore(
          moment(startTime).add(duration, 'minutes')
        );

      const startTimeBetweenAppointmentStartAndEndTime =
        moment(appointment.appointment_time).isBefore(moment(startTime)) &&
        moment(startTime).isBefore(
          moment(appointment.appointment_time).add(duration, 'minutes')
        );

      const betweenTime =
        sameStartTime ||
        appointmentTimeBetweenStartAndEndTime ||
        startTimeBetweenAppointmentStartAndEndTime;

      return sameBarber && betweenTime;
    });

    return appointmentsAtThisTime.length > 0;
  }

  async findById(id: UUID) {
    return (
      this.appointments.find((appointment) => appointment.id === id) ?? null
    );
  }

  async save(appointment: Appointment) {
    this.appointments.push(appointment);

    return appointment;
  }

  async destroy(id: UUID) {
    const appointment = this.appointments.find(
      (appointment) => appointment.id === id
    );
    const nextAppoitments = this.appointments.filter(
      (appointment) => appointment.id !== id
    );

    this.appointments = nextAppoitments;

    return appointment ?? null;
  }
}
