export const rootQuery =`
  type RootQuery {
    events: [Event!]!
    bookings: [Booking!]!
    login(email: String!, password: String!): AuthData!
  }
`