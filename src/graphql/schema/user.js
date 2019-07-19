export const user =`
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

  type AuthData {
    userId: String!
    token: String!
    tokenExpiration: Int!
  }
`