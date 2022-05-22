
import { gql } from "@apollo/client";

export const GET_COUNTRY = gql`
  query GetCountry($name: String!) {
    getCountry(name: $name) {
      name {
        official
      }
      population
      currencies {
        name
        exchangeRate
      }
    }
  }
`;

export const AUTHENTICATE_USER = gql`
  query authenticateUser($email: String!, $password: String!) {
    authenticateUser( email: $email, password: $password) {
      token
    } 
  }
`

