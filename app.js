import express from 'express'
import bodyParser from 'body-parser'
import graphqlHttp from 'express-graphql'

import { startConnection } from './src/mongoose/connect'
import { graphqlSchema } from './src/graphql/schema'
import { graphqlResolvers } from './src/graphql/resolvers'
import isAuth from './src/middleware/is-auth'

const app = express()
app.use(bodyParser.json())

app.use(isAuth)

app.use(
  '/graphql',
  graphqlHttp({
    schema: graphqlSchema,
    rootValue: graphqlResolvers,
    graphiql: true
  })
)

startConnection(process.env.MONGO_USER, process.env.MONGO_PASSWORD, process.env.MONGO_DB)
  .then(_ => {
    const port = 3000
    app.listen(port, () => console.log(`GraphQL API listening on port ${port}\nTo access a graphql tool go to http://localhost:${port}/graphql`))
  })
  .catch(error => {
     throw error.message
  })
