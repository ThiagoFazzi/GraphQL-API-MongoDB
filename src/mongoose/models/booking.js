//import mongoose from 'mongoose'
import { Schema, model } from 'mongoose'

//const Schema = mongoose.Schema

const bookingSchema = new Schema(
  {
    event: {
      type: Schema.Types.ObjectId,
      ref: 'Event'
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  { timestamps: true }
)

//export default mongoose.model('Booking', bookingSchema)
export default model('Booking', bookingSchema)