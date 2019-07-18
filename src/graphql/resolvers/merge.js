import Event from '../../models/event'
import User from '../../models/user'
import { dateToString } from '../../helpers/date'

const events = async eventIds => {
  try{
    const events = await Event.find({ _id: { $in: eventIds } })
    return events.map(event => {
      return {
        ...event._doc,
        _id: event.id,
        date: new Date(event._doc.date).toString(),
        creator: user.bind(this, event.creator)
      }
    })
  } catch (err) {
    throw err
  }
}

const singleEvent = async eventId => {
  try{
    const event = await Event.findById(eventId)
    return transformEvent(event)
  }
  catch(err){
    throw err
  }
}

const user = userId => {
  return User.findById(userId)
  .then(user => {
    return {
      ...user._doc,
      _id: user.id,
      createdEvents: events.bind(this, user._doc.createdEvents)
    }
  })
  .catch(err => {
    throw err
  })
}

export const transformEvent = (event) => {
  return {
    ...event._doc, 
    _id: event.id,
    date: new Date(event._doc.date).toISOString(),
    creator:  user.bind(this, event.creator)
  }
}

export const transformBooking = (booking) => {
  return { 
    ...booking._doc,
    _id: booking.id,
    user: user.bind(this, booking._doc.user),
    event: singleEvent.bind(this, booking._doc.event),
    createdAt: dateToString(booking._doc.createdAt),
    updatedAt: dateToString(booking._doc.updatedAt)
  }
}