const { gql } = require("apollo-server");
const { RateLimit } =  require("./../constants/constants");

const limit = RateLimit["LIMIT"];
const duration = RateLimit["DURATION"]

const typeDefs = gql`
  scalar JSON


  type CountryName {
    common: String
    official: String
  }

  type CurrencyData {
    from: String
    to: String
    amount: Float
  }

  type CurrencyRateInfo {
    timestamp: Int
    rate: Float
  }

  type Currency {
    name: String
    exchangeRate: Float
  }

  type Country {
    id: ID
    name: CountryName
    population: String
    currencies: [Currency!]!
  }

  type AuthPayLoad {
    token: String!
  }

 

  type Query {
    getCountry(name: String!): [Country]
    authenticateUser(email: String!, password: String!): AuthPayLoad! @rateLimit(limit: ${limit}, duration: ${duration}) 
  }
`;

module.exports = { typeDefs };
