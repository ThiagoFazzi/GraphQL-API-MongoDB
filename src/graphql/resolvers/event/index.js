import { events } from './events'
import { createEvent } from './createEvent'

export const eventResolver = {
  ...events,
  ...createEvent
}