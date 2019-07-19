import Booking from '../../mongoose/models/booking'
import Event from '../../mongoose/models/event'
import { transformBooking, transformEvent } from './merge'
import { isAuth } from '../../helpers/isAuth'

export const bookingResolver = {
  bookings: async (args, req) => {
    isAuth(req.isAuth)
    try{
      const bookings = await Booking.find()
      return bookings.map(booking => {
        return transformBooking(booking)
      })
    } catch(error) {
      throw error
    }
  },
  createBookingEvent: async (args, req) => {
    isAuth(req.isAuth)
    try {
      const fetchedEvent = await Event.findOne({ _id: args.eventId })
      const booking = new Booking({
        user: req.userId,
        event: fetchedEvent
      })
      const result = await booking.save()
      return transformBooking(result)
    } catch (error) {
      throw error
    }
  },
  cancelBooking: async (args, req) => {
    isAuth(req.isAuth)
    try{
      const booking = await Booking.findById(args.bookingId).populate('event')
      const event = transformEvent(booking.event)
      await Booking.deleteOne({ _id: args.bookingId })
      return event
    } catch(err) {
      throw err
    }
  }
}