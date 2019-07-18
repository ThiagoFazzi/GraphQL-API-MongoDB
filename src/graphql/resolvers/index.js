import { authResolver } from './auth'
import { eventResolver } from './event'
import { bookingResolver } from './booking'

export const graphqlResolvers = {
  ...authResolver,
  ...eventResolver,
  ...bookingResolver
}