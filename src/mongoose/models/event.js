import { Schema, model } from 'mongoose'

const eventSchema = new Schema({
  title: {
    type: String,
    require: true
  },
  description: {
    type: String,
    require: true,
  },
  price: {
    type: Number,
    require: true
  },
  date: {
    type: Date,
    require: true
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
})

export default model('Event', eventSchema)