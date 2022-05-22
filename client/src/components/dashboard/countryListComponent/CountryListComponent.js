import { Table } from "semantic-ui-react";

const CountryListComponent = (props) => {
  const { countryFullData } = props;
  return (
    <Table celled stuctured>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell rowSpan="2" textAlign="center">
            Country Full Name
          </Table.HeaderCell>
          <Table.HeaderCell rowSpan="2" textAlign="center">
            Population
          </Table.HeaderCell>
          <Table.HeaderCell colSpan="3" textAlign="center">
            Currencies
          </Table.HeaderCell>
        </Table.Row>
        <Table.Row>
          <Table.HeaderCell textAlign="center">Name</Table.HeaderCell>
          <Table.HeaderCell textAlign="center">Exchange Rate</Table.HeaderCell>
          <Table.HeaderCell textAlign="center">
            Converted Amount
          </Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {countryFullData &&
          countryFullData.length &&
          countryFullData.map(
            (country, index) =>
              country.currencies &&
              country.currencies.length &&
              country.currencies.map((currency, key) => (
                <Table.Row key={index}>
                  {key == 0 ? (
                    <>
                      <Table.Cell rowSpan={country.currencies.length}>
                        {country.name.official}
                      </Table.Cell>
                      <Table.Cell rowSpan={country.currencies.length}>
                        {country.population}
                      </Table.Cell>
                      <Table.Cell>{currency.name}</Table.Cell>
                      <Table.Cell>{currency.exchangeRate}</Table.Cell>
                      <Table.Cell>
                        {currency.amount
                          ? currency.amount
                          : currency.exchangeRate}
                      </Table.Cell>
                    </>
                  ) : (
                    <>
                      <Table.Cell>{currency.name}</Table.Cell>
                      <Table.Cell>{currency.exchangeRate}</Table.Cell>
                      <Table.Cell>
                        {currency.amount
                          ? currency.amount
                          : currency.exchangeRate}
                      </Table.Cell>
                    </>
                  )}
                </Table.Row>
              ))
          )}
      </Table.Body>
    </Table>
  );
};

export default CountryListComponent;
