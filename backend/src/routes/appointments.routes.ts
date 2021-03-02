import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import { parseISO } from 'date-fns';

import AppointmentRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

const appointmentRoutes = Router();

appointmentRoutes.get('/', async (request, response) => {
  const appointmentsRepository = getCustomRepository(AppointmentRepository);
  const appointiments = await appointmentsRepository.find();

  return response.json(appointiments);
});

appointmentRoutes.post('/', async (request, response) => {
  try {
    const { provider_id, date } = request.body;

    const parseDate = parseISO(date);

    const createappointment = new CreateAppointmentService();

    const appointiment = await createappointment.execute({
      date: parseDate,
      provider_id,
    });

    return response.json(appointiment);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default appointmentRoutes;
