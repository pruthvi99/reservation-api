import ReservationController from '../controllers/reservationController';
import { Reservation } from '../models/reservationModel';

class ReservationService {
  // Retrieve all reservations
  async getAllReservations(): Promise<any> {
    try {
      const reservations = await ReservationController.getAllReservations();
      return reservations;
    } catch (error) {
      console.error('Error in ReservationService.getAllReservations:', error);
      throw error;
    }
  }

  // Retrieve a reservation by ID
  async getReservationById(reservationId: string): Promise<any> {
    try {
      const reservation = await ReservationController.getReservationById(reservationId);

      if (!reservation) {
        return Promise.reject(new Error('Reservation not found'));
      }
      return reservation;
    } catch (error) {
      console.error('Error in ReservationService.getReservationById:', error);
      throw error;
    }
  }

  // Create a new reservation
  async createReservation(reservationData: Reservation): Promise<any> {
    try {
      const newReservation = await ReservationController.createReservation(reservationData);
      return newReservation;
    } catch (error) {
      console.error('Error in ReservationService.createReservation:', error);
      throw error;
    }
  }

  // Cancel a reservation by ID
  async updateReservation(reservationId: string): Promise<any> {
    try {
      const deletedReservation = await ReservationController.updateReservation(reservationId);
      return deletedReservation;
    } catch (error) {
      console.error('Error in ReservationService.cancelReservation:', error);
      throw error;
    }
  }

  // Get guest stay summary by guestMemberId
  async getGuestStaySummary(guestMemberId: string): Promise<any> {
    try {
      return await ReservationController.getGuestStaySummary(guestMemberId);
    } catch (error) {
      console.error('Error in ReservationService.getGuestStaySummary:', error);
      throw error;
    }
  }

  // Search stays in a given date range
  async searchStaysInDateRange(from: string, to: string): Promise<any> {
    try {
      const staysInDateRange = await ReservationController.searchStaysInDateRange(from, to);
      return staysInDateRange;
    } catch (error) {
      console.error('Error in ReservationService.searchStaysInDateRange:', error);
      throw error;
    }
  }
}

export default new ReservationService();
