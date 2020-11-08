import { Router } from 'express';
import { parseISO } from 'date-fns';

import AppointmentsRepository from '../repository/AppointmentsRepository';
import CreateAppointmentServices from '../services/CreateAppointmentService';

const appointmentsRouter = Router();

const appointmentsRepository = new AppointmentsRepository();

appointmentsRouter.get('/', (request, response) => {
  const appointments = appointmentsRepository.all();

  return response.send(appointments);
});
appointmentsRouter.post('/', (request, response) => {
  try {
    const { provider, date } = request.body;

    const parsedDate = parseISO(date);
    const CreateAppointment = new CreateAppointmentServices(
      appointmentsRepository,
    );

    const appointment = CreateAppointment.execute({
      date: parsedDate,
      provider,
    });
    return response.json(appointment);
  } catch (err) {
    response.status(400).json({ error: err.message });
  }
});

export default appointmentsRouter;
