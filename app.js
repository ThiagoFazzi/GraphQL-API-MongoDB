import express from 'express'
import bodyParser from 'body-parser'
import graphqlHttp from 'express-graphql'
import mongoose from 'mongoose'

import { graphqlSchema } from './src/graphql/schema'
import { graphqlResolvers } from './src/graphql/resolvers'

const app = express()
app.use(bodyParser.json())

app.use(
  '/graphql',
  graphqlHttp({
    schema: graphqlSchema,
    rootValue: graphqlResolvers,
    graphiql: true
  })
)

mongoose.connect(
  `mongodb+srv://${process.env.MONGO_USER}:${
    process.env.MONGO_PASSWORD
  }@cluster0-vpwhf.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`
).then(
  app.listen(3000)
).catch(err => {
  throw err
})