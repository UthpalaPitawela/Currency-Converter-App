import {  useState } from "react";
import { Input, Button } from "semantic-ui-react";

const SearchComponent = (props) => {
  const [searchTerm, setSearchTerm] = useState("");
  const { handleSearchChange } = props;

  const handleOnChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div>
      <Input
        focus
        placeholder="Search..."
        icon="search"
        value={searchTerm}
        onChange={handleOnChange}
      />
      <Button
        attached="right"
        color="teal"
        primary
        onClick={() => handleSearchChange(searchTerm)}
      >
        Search
      </Button>
    </div>
  );
};

export default SearchComponent;
