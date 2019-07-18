import { buildSchema } from 'graphql'

import { event } from './event' 
import { booking } from './booking'
import { user } from './user'

import { rootQuery } from './rootQuery'
import { rootMutation } from './rootMutation'

const schema =`
  schema {
    query: RootQuery
    mutation: RootMutation
  }
`

export const graphqlSchema =  buildSchema(`
  ${booking}
  ${event}
  ${user}
  ${rootQuery}
  ${rootMutation}
  ${schema}
`)