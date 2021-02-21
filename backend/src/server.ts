import 'reflect-metadata';

import express from 'express';
import AppointmentRouter from './routes/appointments.routes';

import './database';

const app = express();

app.use('/appointments', AppointmentRouter);

app.listen(3333, () => {
  // eslint-disable-next-line no-console
  console.log('Server started on port 3333');
});
