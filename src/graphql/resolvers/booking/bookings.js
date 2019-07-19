import Booking from '../../../mongoose/models/booking'
import { transformBooking } from '../merge'
import { isAuth } from '../../../helpers/isAuth'

export const bookings = {
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
  }
}