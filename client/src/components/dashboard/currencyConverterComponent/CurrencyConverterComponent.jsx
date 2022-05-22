import { useState } from "react";
import { Input, Button, Message } from "semantic-ui-react";
import { setToCache, getFromCache } from "../../../utils/cache";
import { CacheType } from "../../../constants/constants";

const CurrencyConverterComponent = (props) => {
const sekInputValue = getFromCache(CacheType.SEK_AMOUNT)
const [sekAmount, setSekAmount] = useState(sekInputValue?sekInputValue: 1 )
setToCache(CacheType.SEK_AMOUNT,sekAmount)
const {handleCurrencyConvert} = props;
  const handleAmountChange = (event) => {
      setSekAmount(event.target.value)
  }

  return (
    <>
      <Input
        focus
        type="number"
        placeholder="Add amount in SEK..."
        value={sekAmount}
        onChange={handleAmountChange}
      />
      <Button
      attached='right'
        content="Primary"
        primary
        onClick={() => handleCurrencyConvert(sekAmount)}
      >
        Convert
      </Button>
      <br/>
      {
        sekAmount <=0 &&   <Message compact color="red"> Please enter numbers greater than zero !!</Message>
      }
    </>
  );
};

export default CurrencyConverterComponent;
