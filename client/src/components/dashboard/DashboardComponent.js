import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { Grid, Loader, Header, Message, Button } from "semantic-ui-react";

import { GET_COUNTRY } from "../../graphQL/queries";
import { currencyConvert } from "./currencyConverterComponent/CurrencyConverter";
import { getFromCache, setToCache, clearCache } from "../../utils/cache";
import { CacheType, ValidUser } from "../../constants/constants";

import SearchComponent from "./search/SearchComponent";
import SearchResultsComponent from "./searchResultsComponent/SearchResultsComponent";
import CountryListComponent from "./countryListComponent/CountryListComponent";
import CurrencyConverterComponent from "./currencyConverterComponent/CurrencyConverterComponent";

function DashboardComponent(props) {
  const [countryName, setCountryName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [countryData, setCountryData] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(props.isLoggedIn);

  const handleSearchChange = (searchTerm) => {
    setSearchTerm(searchTerm);
  };

  const { loading, error, data } = useQuery(GET_COUNTRY, {
    variables: { name: searchTerm },
  });

  useEffect(() => {
    const countriesData = getFromCache(CacheType.COUNTRIES);
    setCountryData(countriesData);
  }, []);

  useEffect(() => {
    if (data && data.getCountry && data.getCountry.length) {
      setCountryName(data.getCountry[0].name.official);
    }
  }, [data]);

  const addCountryToList = () => {
    let countries = getFromCache(CacheType.COUNTRIES);
    if (countries === null) {
      let countries = [data.getCountry[0]];
      setToCache(CacheType.COUNTRIES, countries);
      setCountryData(countries);
    } else {
      countries.push(data.getCountry[0]);
      setToCache(CacheType.COUNTRIES, countries);
      setCountryData(countries);
    }
    setCountryName("");
  };

  const handleCurrencyConvert = (sekAmount) => {
    if (sekAmount > 0) {
      const countryData = getFromCache(CacheType.COUNTRIES);
      const updatedCountryData = currencyConvert(sekAmount, countryData);
      setCountryData(updatedCountryData);
      setToCache(CacheType.COUNTRIES, updatedCountryData);
    }
  };

  const signout = () => {
    clearCache(CacheType.COUNTRIES);
    clearCache(CacheType.SEK_AMOUNT);
    clearCache(ValidUser.EMAIL);
    setIsLoggedIn(false);
  };

  return (
    <>
      <div />
      <Header as="h1" textAlign="center">
        The Currency Converter
        <Button floated="right" color="teal" onClick={signout}>
          {" "}
          Sign Out
        </Button>
      </Header>
      <Grid divided="vertically">
        <Grid.Row columns={2}>
          <Grid.Column>
            <SearchComponent handleSearchChange={handleSearchChange} />
            {searchTerm && error && (
              <Message compact color="red">
                {" "}
                Sorry !! Country not found
              </Message>
            )}
            {loading && searchTerm && <Loader active inline="centered" />}
            {countryName && (
              <SearchResultsComponent
                name={countryName}
                addCountryToList={addCountryToList}
              />
            )}
          </Grid.Column>
          <Grid.Column>
            <CurrencyConverterComponent
              handleCurrencyConvert={handleCurrencyConvert}
            />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={2} />
          <Grid.Column width={12}>
            {countryData && (
              <CountryListComponent countryFullData={countryData} />
            )}
          </Grid.Column>
          <Grid.Column width={2} />
        </Grid.Row>
      </Grid>
      {!isLoggedIn && <Navigate to="/" />}
    </>
  );
}

export default DashboardComponent;
