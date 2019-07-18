import { buildSchema } from 'graphql'

const Booking =`
  type Booking {
    _id: ID!
    event: Event!
    user: User!
    createdAt: String!
    updatedAt: String!
  }
`

const Event =`
  type Event {
    _id: ID!
    title: String!
    description: String!
    price: Float!
    date: String!
    creator: User!
  }
  input EventInput {
    title: String!
    description: String!
    price: Float!
    date: String!
  }
`

const User =`
  type User {
    _id: ID!
    email: String!
    password: String
    createdEvents: [Event!]
  }
  input UserInput {
    email: String!
    password: String!
  }
`

const RootQuery =`
  type RootQuery {
    events: [Event!]!
    bookings: [Booking!]!
  }
`

const RootMutation =`
  type RootMutation {
    createEvent(eventInput: EventInput): Event
    createUser(userInput: UserInput): User
    createBookingEvent(eventId: ID!): Booking!
    cancelBooking(bookingId: ID!): Event!
  }
`

const Schema =`
  schema {
    query: RootQuery
    mutation: RootMutation
  }
`

export const graphqlSchema =  buildSchema(`
  ${Booking}
  ${Event}
  ${User}
  ${RootQuery}
  ${RootMutation}
  ${Schema}
`)