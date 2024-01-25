
import ReservationModel, { Reservation } from '../models/reservationModel';
import { Error } from 'mongoose';

class ReservationController {
  async getAllReservations(): Promise<any> {
    try {
      const reservations = await ReservationModel.find();
      return reservations;
    } catch (error) {
      throw error;
    }
  }

  async getReservationById(reservationId: string): Promise<any> {
    try {
      const reservation = await ReservationModel.findOne({ reservationId });
      if (!reservation) {
        throw new Error('Reservation not found');
      }
      return reservation;
    } catch (error) {
      throw error;
    }
  }

  async createReservation(reservationData: Reservation): Promise<any> {
    try {
      const newReservation = await ReservationModel.create(reservationData);
      return newReservation;
    } catch (error) {
      throw error;
    }
  }

  async cancelReservation(reservationId: string): Promise<any> {
    try {
      const result = await ReservationModel.deleteOne({ reservationId });
      if (result.deletedCount === 0) {
        throw new Error('Reservation not found');
      }
      return result;
    } catch (error) {
      console.error('Error in cancelReservation:', error);
      throw new Error('Database error');
    }
  }

  async getGuestStaySummary(guestMemberId: string): Promise<any> {
    try {
      const upcomingStays = await ReservationModel.find({
        guestMemberId,
        arrivalDate: { $gte: new Date() },
        status: 'active',
      });

      const pastStays = await ReservationModel.find({
        guestMemberId,
        departureDate: { $lt: new Date() },
        status: 'active',
      });

      const cancelledStays = await ReservationModel.find({
        guestMemberId,
        status: 'cancelled',
      });

      const calculateTotalAmount = (stays: any[]): number => {
        return stays.reduce((total, stay) => total + stay.baseStayAmount + stay.taxAmount, 0);
      };

      const calculateTotalNights = (
        arrivalDate: string,
        departureDate: string
      ): number => {
        const arrival = new Date(arrivalDate);
        const departure = new Date(departureDate);
        if (departure < arrival) {
          throw new Error('Departure date cannot be earlier than arrival date.');
        }
        const timeDiff = Math.abs(departure.getTime() - arrival.getTime());
        return Math.ceil(timeDiff / (1000 * 3600 * 24));
      };

      const calculateTotalStaysAmount = (upcomingStays: Reservation[], pastStays: Reservation[]): number => {
        const allStays = [...upcomingStays, ...pastStays];
        return calculateTotalAmount(allStays);
      };

      const calculateTotalNightsForAll = (
        reservationArray: Reservation[]
      ): { [key: string]: number } => {
        let totalNightsForAll = 0;
      
        const resultObject: { [key: string]: number } = {};
      
        reservationArray.forEach((reservation) => {
          const totalNights = calculateTotalNights(
            reservation.arrivalDate,
            reservation.departureDate
          );
      
          totalNightsForAll += totalNights;
      
          resultObject[reservation.reservationId] = totalNights;
        });
      
        resultObject['Total'] = totalNightsForAll;
      
        return resultObject;
      };

      return {
        guestMemberId,
        upcomingStayInfo: {
          numberOfStays: upcomingStays.length,
          totalNights: calculateTotalNightsForAll(upcomingStays)['Total'],
          totalAmount: calculateTotalAmount(upcomingStays),
        },
        pastStayInfo: {
          numberOfStays: pastStays.length,
          totalNights: calculateTotalNightsForAll(pastStays)['Total'],
          totalAmount: calculateTotalAmount(pastStays),
        },
        cancelledStayInfo: {
          numberOfStays: cancelledStays.length,
          numberOfCancelledReservations: cancelledStays.length,
          totalAmount: calculateTotalAmount(cancelledStays),
        },
        totalStaysAmount: calculateTotalStaysAmount(upcomingStays, pastStays),
      };
    } catch (error) {
      console.error('Error in getGuestStaySummary:', error);
      throw error;
    }
  }

  async searchStaysInDateRange(from: string, to: string): Promise<any> {
    const isValidDateFormat = (dateString: string): boolean => {
      const regex = /^\d{4}-\d{2}-\d{2}$/;
      return regex.test(dateString);
    };

    if (!isValidDateFormat(from) || !isValidDateFormat(to)) {
      throw new Error('Invalid date format. Please provide dates in the format: YYYY-MM-DD');
    }

    try {
      // Adjusting date strings to consider the full day for 'to' (2024-03-15 should include the entire day)
      const adjustedTo = new Date(to);
      adjustedTo.setDate(adjustedTo.getDate() + 1);

      const staysInDateRange = await ReservationModel.find({
        arrivalDate: { $lte: adjustedTo.toISOString() },
        departureDate: { $gte: from },
      });

      return staysInDateRange;
    } catch (error) {
      throw error;
    }
  }
}

export default new ReservationController();
