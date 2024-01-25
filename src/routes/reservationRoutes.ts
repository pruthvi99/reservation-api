
import express, { Request, Response } from 'express';
import ReservationService from '../services/reservationService';
import {authMiddleware, generateToken } from '../middlewares/authMiddleware';

const router = express.Router();


router.post('/login', (req: Request, res: Response) => {
  const { username, password } = req.body;
  if (username === '123' && password === 'abc') { // I would add a DB operation to check if the user is registered will wrap it around in a controller.
    let user = {username};
    const token = generateToken(user);
    res.json({ token });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});


router.get('/', authMiddleware, async (req: Request, res: Response) => {
  try {
    const reservations = await ReservationService.getAllReservations();
    res.json(reservations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/:id', authMiddleware, async (req: Request, res: Response) => {
  const reservationId = req.params.id;

  try {
    const reservation = await ReservationService.getReservationById(reservationId);
    if (!reservation) {
      res.status(404).json({ error: 'Reservation not found' });
    } else {
      res.json(reservation);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/', authMiddleware, async (req: Request, res: Response) => {
  const reservationData = req.body;

  try {
    const newReservation = await ReservationService.createReservation(reservationData);
    res.status(201).json(newReservation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.delete('/:id', authMiddleware, async (req: Request, res: Response) => {
  const reservationId = req.params.id;

  try {
    const deletedReservation = await ReservationService.cancelReservation(reservationId);
    if (!deletedReservation) {
      res.status(404).json({ error: 'Reservation not found', reservationId });
    } else {
      res.json({ message: 'Reservation cancelled successfully' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/guestStaySummary/:guestMemberId', authMiddleware, async (req, res) => {
  const { guestMemberId } = req.params;

  try {
    const guestStaySummary = await ReservationService.getGuestStaySummary(guestMemberId);
    res.status(200).json(guestStaySummary);
  } catch (error) {
    console.error('Error in /guestStaySummary/:guestMemberId:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/search', authMiddleware, async (req, res) => {
  const { from, to } = req.body;

  try {
    const staysInDateRange = await ReservationService.searchStaysInDateRange(from, to);
    res.status(200).json(staysInDateRange);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
