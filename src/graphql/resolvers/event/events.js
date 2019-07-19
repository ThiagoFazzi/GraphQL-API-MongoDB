import Event from '../../../mongoose/models/event'
import { transformEvent } from '../merge'

export const events = {
  events: async () => {
    try {
      const events = await Event.find()
      return events.map(event => {
        return transformEvent(event)
      })
    } catch (err) {
      throw err
    }
  }
}