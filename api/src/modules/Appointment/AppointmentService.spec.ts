import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { UUID, randomUUID } from 'crypto';

import { AppointmentService } from './AppointmentService';
import { AppointmentError } from '@/Errors/AppointmentError';
import { InMemoryAppointmentRepository } from './InMemoryAppointmentRepository';

let appointmentRepository : InMemoryAppointmentRepository;
let appointmentService : AppointmentService;

let id: UUID;

describe('Appointment service', () => {
  beforeEach(() => {
    appointmentRepository = new InMemoryAppointmentRepository();
    appointmentService = new AppointmentService(appointmentRepository);

    vi.useFakeTimers();

    id = randomUUID();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should not be possible to schedule an appointment before the barber shop opens', async () => {
    await expect(() => appointmentService.save({
      appointment_time: new Date(2023, 0, 1, 7),
      client_id: id,
      specialty_id: id,
      barber_id: id
    })).rejects.toBeInstanceOf(AppointmentError);
  });

  it('should not be possible to schedule an appointment after the barber shop closes', async () => {
    await expect(() => appointmentService.save({
      appointment_time: new Date(2023, 0, 1, 19),
      client_id: id,
      specialty_id: id,
      barber_id: id
    })).rejects.toBeInstanceOf(AppointmentError);
  });

  it('should not be possible to cancel an appointment with two hours left before it', async () => {
    const appointment = await appointmentService.save({
      appointment_time: new Date(2023, 0, 1, 16),
      client_id: id,
      specialty_id: id,
      barber_id: id
    });

    vi.setSystemTime(new Date(2023, 0, 1, 14, 30));

    await expect(() => appointmentService.destroy(appointment.id)).rejects.toBeInstanceOf(AppointmentError);
  });

  it('should not be possible to schedule multiple appointments with the same barber and overlaping service times', async () => {
    await appointmentService.save({
      appointment_time: new Date(2023, 0, 1, 16, 0),
      client_id: id,
      specialty_id: id,
      barber_id: id
    });

    await expect(() => appointmentService.save({
      appointment_time: new Date(2023, 0, 1, 16, 20),
      client_id: id,
      specialty_id: id,
      barber_id: id
    })).rejects.toBeInstanceOf(AppointmentError);
  });
});