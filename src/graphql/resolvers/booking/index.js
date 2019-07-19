import { bookings } from './bookings'
import { createBookingEvent } from './createBookingEvent'
import { cancelBooking } from './cancelBooking'  

export const bookingResolver = {
  ...bookings,
  ...createBookingEvent,
  ...cancelBooking
}