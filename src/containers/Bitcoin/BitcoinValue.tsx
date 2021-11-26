import { HIDE_LOADER } from "actions/types";
import Button from "common-components/Button/Button";
import NumberInput from "common-components/NumberInput/NumberInput";
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux";
import { IGenericOption } from "shared/interfaces";
import "./Bitcoin.scss";
const requestOptions : IGenericOption = {
  method: 'GET',
  redirect: 'follow'
};

export const BitcoinValue = () => {
  const [input, setInput] = useState('');
  const [currentBitCoinValue, setBitCoinValue] = useState('');
  const dispatch = useDispatch();
  
  const getBitcoinValue = () => {
    fetch("https://api.coincap.io/v2/assets/bitcoin", requestOptions)
      .then(response => response.json())
      .then((result: IGenericOption) => {
        setBitCoinValue(result?.data?.priceUsd);
      })
      .catch(error => {
        dispatch({
          type: HIDE_LOADER,
        });
        console.log(error)
      });
  };

  useEffect(() => {
    getBitcoinValue();
  }, [])

  const handleInput = (value: string) => {
    setInput(value);
  };

  return (
    <div className="bitcoin-container">
      <h2 className="span-wrapper">Get Bitcoin Amount {currentBitCoinValue ?  <span className
      ='highlight'> 1 Unit : &#36;{currentBitCoinValue}</span> : null} </h2>
      <div>
        <NumberInput 
          customClass={"sell-input"}
          label={""}
          value={input}
          onChange={handleInput}
          showLabel={true}
          name={"sell"}
          placeholder={"Enter bitcoin value"}
        />
        {!currentBitCoinValue ? <Button 
          name={"sell-submit"}
          customClass={"sell-submit"}
          title={"Update"}
          onClick={getBitcoinValue}
          theme={"orange"}
        /> : null}
        { input && currentBitCoinValue ? <p className="text-value"> Total Amount of Input Value : &#36; { parseFloat(input) * parseFloat(currentBitCoinValue)}</p> : null}
      </div>
    </div>
  )
}