import Booking from '../../../mongoose/models/booking'
import Event from '../../../mongoose/models/event'
import { transformBooking } from '../merge'
import { isAuth } from '../../../helpers/isAuth'

export const createBookingEvent = {
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
  }
}