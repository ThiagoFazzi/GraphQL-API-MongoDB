import Booking from '../../../mongoose/models/booking'
import { transformEvent } from '../merge'
import { isAuth } from '../../../helpers/isAuth'

export const cancelBooking = {
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