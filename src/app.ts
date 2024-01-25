// app.ts
import express from 'express';
import connectToDatabase from '../src/models/mongoose';
import config from './config';
import reservationRoutes from './routes/reservationRoutes';

const app = express();

connectToDatabase().then(() => {
  app.use(express.json());
  app.use('/reservations', reservationRoutes);

  app.get('/', (req, res) => {
    res.send('Welcome to the hotel reservation API!');
  });

  const PORT = config.port || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
