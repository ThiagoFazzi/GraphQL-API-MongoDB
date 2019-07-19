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

  createEvent: async (args, req) => {
    const event = new Event({
      title: args.eventInput.title,
      description: args.eventInput.description,
      price: +args.eventInput.price,
      date: new Date(args.eventInput.date),
      creator: '5d2eec6c1ce6ff5068f424a2'
    })
    let createdEvent
    try {
      const result = await event.save()
      createdEvent = transformEvent(result)
      const creator = await User.findById('5d2eec6c1ce6ff5068f424a2')
      
      if(!creator){
        throw new Error('User not found.')
      }

      creator.createdEvents.push(event)
      await creator.save()
      return createdEvent

    } catch (error) {
      throw error
    }
  }
}