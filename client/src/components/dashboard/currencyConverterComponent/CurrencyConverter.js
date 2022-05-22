export const currencyConvert = (sekAmount, countryData) => {
    const updatedCountryData = countryData.map((country) => {
      const currencies = country.currencies.map((currency) => {
        return { ...currency, amount: currency.exchangeRate * sekAmount };
      });
      return { ...country, currencies };
    })
    return updatedCountryData;
  };