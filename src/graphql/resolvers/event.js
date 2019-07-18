import Event from '../../mongoose/models/event'
import User from '../../mongoose/models/user'
import { transformEvent } from './merge'

export const eventResolver = {
  events: async () => {
    try {
      const events = await Event.find()
      return events.map(event => {
        return transformEvent(event)
      })
    } catch (err) {
      throw err
    }
  },
  createEvent: args => {
    const event = new Event({
      title: args.eventInput.title,
      description: args.eventInput.description,
      price: +args.eventInput.price,
      date: new Date(args.eventInput.date),
      creator: '5d2eec6c1ce6ff5068f424a2'
    })
    let createdEvent
    return event.save()
      .then(result => {
        createdEvent = transformEvent(result)
        return User.findById('5d2eec6c1ce6ff5068f424a2')
      })
      .then(user => {
        if(!user){
          throw new Error('User not found.')
        }
        user.createdEvents.push(event)
        return user.save()
      })
      .then(result => {
        return createdEvent
      })
      .catch(err => {
        throw err
      })
  }
}