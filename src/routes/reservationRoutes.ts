import express, { Request, Response } from 'express';
import ReservationService from '../services/reservationService';
import { authMiddleware, generateToken } from '../middlewares/authMiddleware';

const router = express.Router();

// Route to generate JWT token for authentication
router.post('/login', (req: Request, res: Response) => {
  const { username, password } = req.body;
  // validate credentials from a database.
  if (username === '123' && password === 'abc') {
    let user = { username };
    const token = generateToken(user);
    res.status(200).json({ token });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

// Route to get all reservations
router.get('/', authMiddleware, async (req: Request, res: Response) => {
  try {
    const reservations = await ReservationService.getAllReservations();
    res.status(200).json(reservations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route to get a specific reservation by ID
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

// Route to create a new reservation
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

// Route to cancel a reservation by ID
router.patch('/:id', authMiddleware, async (req: Request, res: Response) => {
  const reservationId = req.params.id;

  try {
    const updatedReservation = await ReservationService.updateReservation(reservationId);

    if (!updatedReservation) {
      res.status(404).json({ error: 'Reservation not found', reservationId });
    } else {
      res.status(200).json({ message: 'Reservation updated successfully', updatedReservation });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route to get guest stay summary by guestMemberId
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

// Route to search reservations in a given date range
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
