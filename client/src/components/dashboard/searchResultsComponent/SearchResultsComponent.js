import { List, Button } from "semantic-ui-react";

const SearchResultsComponent = (props) => {
  const { name, addCountryToList } = props;
  return (
    <List divided selection>
      <List.Item>
        {name}
        <Button positive onClick={addCountryToList}>
          Add
        </Button>
      </List.Item>
    </List>
  );
};

export default SearchResultsComponent;
