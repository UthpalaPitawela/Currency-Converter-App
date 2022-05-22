const { makeExecutableSchema } = require('@graphql-tools/schema');
const { rateLimitDirective } = require('graphql-rate-limit-directive');
const { rateLimitDirectiveTypeDefs, rateLimitDirectiveTransformer } = rateLimitDirective();
const { typeDefs } = require("./typeDefs");
const { resolvers } = require("./resolvers");

let schema = makeExecutableSchema({
    typeDefs: [
      rateLimitDirectiveTypeDefs,
      typeDefs
    ],
    resolvers
  });
  
  schema = rateLimitDirectiveTransformer(schema);


  module.exports = {schema}