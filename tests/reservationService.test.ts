import ReservationService from '../src/services/reservationService';
import ReservationController from '../src/controllers/reservationController';

jest.mock('../src/controllers/reservationController');

describe('ReservationService', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('getAllReservations', () => {
    it('should return all reservations', async () => {
      const mockReservations = [{ reservationId: '123', guestName: 'John Doe' }];
      jest.spyOn(ReservationController, 'getAllReservations').mockResolvedValue(mockReservations);

      const result = await ReservationService.getAllReservations();

      expect(result).toEqual(mockReservations);
    });

    it('should throw an error if an error occurs', async () => {
      jest.spyOn(ReservationController, 'getAllReservations').mockRejectedValue(new Error('Database error'));

      await expect(ReservationService.getAllReservations()).rejects.toThrow('Database error');
    });
  });

  describe('getReservationById', () => {
    it('should return a reservation by ID', async () => {
      const mockReservation = { reservationId: '123', guestName: 'John Doe' };
      jest.spyOn(ReservationController, 'getReservationById').mockResolvedValue(mockReservation);

      const result = await ReservationService.getReservationById('123');

      expect(result).toEqual(mockReservation);
    });

    it('should throw an error if reservation is not found', async () => {
      jest.spyOn(ReservationController, 'getReservationById').mockResolvedValue(null);

      await expect(ReservationService.getReservationById('123')).rejects.toThrow('Reservation not found');
    });

    it('should throw an error if an error occurs', async () => {
      jest.spyOn(ReservationController, 'getReservationById').mockRejectedValue(new Error('Database error'));

      await expect(ReservationService.getReservationById('123')).rejects.toThrow('Database error');
    });
  });

  describe('cancelReservation', () => {
    it('should cancel a reservation', async () => {
      const mockReservationId = '123';
      const mockDeletedReservation = { reservationId: mockReservationId, guestName: 'John Doe' };
      jest.spyOn(ReservationController, 'cancelReservation').mockResolvedValue(mockDeletedReservation);

      const result = await ReservationService.cancelReservation(mockReservationId);

      expect(result).toEqual(mockDeletedReservation);
    });
  });

  describe('getGuestStaySummary', () => {
    it('should get guest stay summary', async () => {
      const mockGuestMemberId = '456';
      const mockStaySummary = { totalNights: 5, totalAmount: 100 };
      jest.spyOn(ReservationController, 'getGuestStaySummary').mockResolvedValue(mockStaySummary);

      const result = await ReservationService.getGuestStaySummary(mockGuestMemberId);

      expect(result).toEqual(mockStaySummary);
    });
  });

  describe('searchStaysInDateRange', () => {
    it('should search stays within the specified date range', async () => {
      const mockFrom = '2024-03-01';
      const mockTo = '2024-03-15';
      const mockStaysInDateRange = [{ reservationId: '123', guestName: 'John Doe' }];
      jest.spyOn(ReservationController, 'searchStaysInDateRange').mockResolvedValue(mockStaysInDateRange);

      const result = await ReservationService.searchStaysInDateRange(mockFrom, mockTo);

      expect(result).toEqual(mockStaysInDateRange);
    });
  });
});
