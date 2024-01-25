import ReservationController from '../src/controllers/reservationController';
import ReservationModel from '../src/models/reservationModel';

jest.mock('../src/models/reservationModel');

describe('ReservationController', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('getAllReservations', () => {
    it('should return all reservations', async () => {
      const mockReservations = [{ reservationId: '123', guestName: 'John Doe' }];
      jest.spyOn(ReservationModel, 'find').mockResolvedValue(mockReservations);

      const result = await ReservationController.getAllReservations();

      expect(result).toEqual(mockReservations);
    });

    it('should throw an error if an error occurs', async () => {
      jest.spyOn(ReservationModel, 'find').mockRejectedValue(new Error('Database error'));

      await expect(ReservationController.getAllReservations()).rejects.toThrow('Database error');
    });
  });

  describe('getReservationById', () => {
    it('should return a reservation by ID', async () => {
      const mockReservation = { reservationId: '123', guestName: 'John Doe' };
      jest.spyOn(ReservationModel, 'findOne').mockResolvedValue(mockReservation);

      const result = await ReservationController.getReservationById('123');

      expect(result).toEqual(mockReservation);
    });

    it('should throw an error if reservation is not found', async () => {
      jest.spyOn(ReservationModel, 'findOne').mockResolvedValue(null);

      await expect(ReservationController.getReservationById('123')).rejects.toThrow('Reservation not found');
    });

    it('should throw an error if an error occurs', async () => {
      jest.spyOn(ReservationModel, 'findOne').mockRejectedValue(new Error('Database error'));

      await expect(ReservationController.getReservationById('123')).rejects.toThrow('Database error');
    });
  });

  describe('searchStaysInDateRange', () => {
    it('should search stays within the specified date range', async () => {
      const mockFrom = '2024-03-01';
      const mockTo = '2024-03-15';
      const mockStaysInDateRange = [{ reservationId: '123', guestName: 'John Doe' }];
      jest.spyOn(ReservationModel, 'find').mockResolvedValue(mockStaysInDateRange);

      const result = await ReservationController.searchStaysInDateRange(mockFrom, mockTo);

      expect(result).toEqual(mockStaysInDateRange);
    });
  });
});
