import { UUID } from 'crypto';

import { Appointment } from './Appointment';

export interface AppointmentRepository {
  save(appointment: Appointment): Promise<Appointment>;
  destroy(id: UUID): Promise<Appointment | null>;
  findById(id: UUID): Promise<Appointment | null>;
  findByDay(day: string): Promise<Appointment[]>;
  findByBarberAndAppointmentTimeBetween(
    barberId: UUID,
    startTime: Date,
    duration: number
  ): Promise<boolean>;
}
