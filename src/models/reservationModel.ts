
import mongoose, { Schema, Document } from 'mongoose';

export interface Reservation extends Document {
  reservationId: string;
  guestMemberId: string;
  guestName: string;
  hotelName: string;
  arrivalDate: string;
  departureDate: string;
  status: string;
  baseStayAmount: number;
  taxAmount: number;
}

const ReservationSchema: Schema = new Schema({
  reservationId: { type: String, required: true },
  guestMemberId: { type: String, required: true },
  guestName: { type: String, required: true },
  hotelName: { type: String, required: true },
  arrivalDate: { type: Date, required: true },
  departureDate: { type: Date, required: true },
  status: { type: String, enum: ['active', 'cancelled'], required: true },
  baseStayAmount: { type: Number, required: true },
  taxAmount: { type: Number, required: true },
});

export default mongoose.model<Reservation>('reservations', ReservationSchema);
