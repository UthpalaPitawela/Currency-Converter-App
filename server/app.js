const { ApolloServer } = require("apollo-server");
const axios = require("axios");


const { applyMiddleware } = require("graphql-middleware");
const Redis = require("ioredis");

const {schema} = require("./schema/schema")

const server = new ApolloServer({
  schema,
  context: (req) => ({
    req,
  }),
});

server.listen().then(({ url }) => console.log(`Server ready at ${url}`));
