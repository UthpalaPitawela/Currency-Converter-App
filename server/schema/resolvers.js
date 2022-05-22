require("dotenv").config();
const axios = require("axios");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const log4js = require("log4js");
const FIXER_API_KEY = process.env.FIXER_API_KEY;
const { userCrendentials, salt } = require("./../authentication/credentials");
const { SecretKey } = require("./../constants/constants")

log4js.configure({
  appenders: { fileAppender: { type: "file", filename: "application.log" },
  out: { type: 'stdout' } },
  categories: { default: { appenders: ["fileAppender"], level: "debug" } }
}); 
var logger = log4js.getLogger("fileAppender");

const getExchangeRatesForCurrencies = async (currencies) => {
  let currenciesWithExchangeRates = [];
  await Promise.all(
    Object.keys(currencies).map(async function (currencyCode) {
      const exchange = await axios.get(
        "https://api.apilayer.com/fixer/convert",
        {
          params: {
            from: "SEK",
            to: currencyCode,
            amount: 1,
          },
        }
      );

      const currency = {
        name: currencies[currencyCode].name,
        exchangeRate: exchange.data.info.rate,
      };
      currenciesWithExchangeRates.push(currency);
    })
  );
  return currenciesWithExchangeRates;
};

const resolvers = {
  Query: {
    getCountry: async (_, args) => {
      let countryData = [];
      try {
        countryData = await axios.get(
          "https://restcountries.com/v3.1/name/" + args.name
        );
      } catch (error) {
        logger.error("Error in country information retrieval", error);
        return error.response.status;
      }

      try {    
        let formattedCountryInfo = countryData && countryData.data && countryData.data.length && countryData.data.map(
          ({ name, population, currencies }) => ({
            name,
            population,
            currencies,
          })
        );

        let currencies = countryData?.data[0].currencies;

        axios.defaults.headers = {
          "Content-Type": "application/json",
          apikey: FIXER_API_KEY,
        };

        if (currencies) {
          const currenciesWithExchangeRates =
            await getExchangeRatesForCurrencies(currencies);
          formattedCountryInfo = [
            {
              ...formattedCountryInfo[0],
              currencies: currenciesWithExchangeRates,
            },
          ];
        }
        return formattedCountryInfo && formattedCountryInfo.map(({ name, population, currencies }) => ({
          name,
          population,
          currencies,
        }));
      } catch (error) {
        logger.error("Error in exchange rate information retrieval", error)
        throw error;
      }
    },
    authenticateUser: async (_, args) => {
      const { email, password } = args;
      if (email && password) {
        const isAValidaUser = userCrendentials.find(
          (creds) =>
            email === creds.email &&
            bcrypt.hashSync(password, salt) === creds.password
        );
        if (isAValidaUser) {
          return { token: jwt.sign(email, SecretKey.KEY) };
        } else {
          return { token: "" };
        }
      } else {
        return { token: "" };
      }
    },
  },
};

module.exports = { resolvers };
