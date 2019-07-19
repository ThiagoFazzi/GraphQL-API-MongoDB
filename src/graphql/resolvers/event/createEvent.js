import Event from '../../../mongoose/models/event'
import User from '../../../mongoose/models/user'
import { transformEvent } from '../merge'
import { isAuth } from '../../../helpers/isAuth'  

export const createEvent ={
  createEvent: async (args, req) => {
    isAuth(req.isAuth)
    const event = new Event({
      title: args.eventInput.title,
      description: args.eventInput.description,
      price: +args.eventInput.price,
      date: new Date(args.eventInput.date),
      creator: req.userId
    })
    let createdEvent
    try {
      const result = await event.save()
      createdEvent = transformEvent(result)
      const creator = await User.findById(req.userId)
      
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