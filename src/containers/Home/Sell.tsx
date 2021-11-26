import { sellBitcoin } from "actions/auth_actions";
import Button from "common-components/Button/Button";
import NumberInput from "common-components/NumberInput/NumberInput";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

export const Sell = (props: any) => {
  const dispatch = useDispatch();
  const [sellamount, setSellAmount] = useState('');
  
  const handleSellAmount = (value: string) => {
    setSellAmount(value);
  };
  
  const notify = (data: string) => toast(data);

  const sellSubmit = () => {
    if( !sellamount ) {
      notify('Enter Sell Value');
    }else if(sellamount > props.bitcoin_value){
      notify('Cannot sell value more the bitcoin value');
    } else {
      dispatch(sellBitcoin({ amount: parseFloat(sellamount) }))
      notify('Bitcoin sold Successfull !!!');
      setSellAmount('')
    }
  };

  return (
    <div className="div-2">
    <h2 className="span-wrapper">Sell BitCoin
      <span className="wallet-balance">(Wallet Amount : &#36; {props.wallet_amount || 0})</span>
      <span className="wallet-balance">(Bitcoin Value : &#36; {props.bitcoin_value || 0})</span>
    </h2>
    <NumberInput 
      customClass={"sell-input"}
      label={""}
      value={sellamount}
      onChange={handleSellAmount}
      showLabel={true}
      name={"sell"}
      placeholder={"Enter bitcoin value"}
    />
    <Button 
      name={"sell-submit"}
      customClass={"sell-submit"}
      title={"Sell"}
      onClick={sellSubmit}
      theme={"orange"}
    />
  </div>
  )
}