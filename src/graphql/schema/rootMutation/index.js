export const rootMutation =`
  type RootMutation {
    createEvent(eventInput: EventInput): Event
    createUser(userInput: UserInput): User
    createBookingEvent(eventId: ID!): Booking!
    cancelBooking(bookingId: ID!): Event!
  }
`