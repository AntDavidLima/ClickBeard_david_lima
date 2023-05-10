import { UUID } from 'crypto';

export interface Appointment {
  id: UUID;
  appointment_time: Date;
  client_id: UUID;
  specialty_id: UUID;
  barber_id: UUID;
}
