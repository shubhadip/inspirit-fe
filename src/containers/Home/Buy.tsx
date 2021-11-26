import { buyBitcoin } from "actions/auth_actions";
import Button from "common-components/Button/Button";
import NumberInput from "common-components/NumberInput/NumberInput";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

export const Buy = (props: any) => {
  const dispatch = useDispatch();
  const [buyamount, setBuyAmount] = useState('');
  
  const handleBuyAmount = (value: string) => {
    setBuyAmount(value);
  };
  
  const notify = (data: string) => toast(data);

  const BuySubmit = () => {
    if( !buyamount ) {
      notify('Enter Purchase Value');
    }else if(buyamount > props.wallet_amount){
      notify('Cannot purchase value More the wallet balance');
    } else {
      dispatch(buyBitcoin({ amount: parseFloat(buyamount) }))
      notify('Purchase Successfull !!!');
      setBuyAmount('')
    }
  };
  
  return (
    <div className="div-1">
      <h2 className="span-wrapper">Buy BitCoin 
        <span className="wallet-balance">(Wallet Amount : &#36; {props.wallet_amount || 0})</span>
        <span className="wallet-balance">(Bitcoin Value : &#36; {props.bitcoin_value || 0})</span>
      </h2>
      <NumberInput 
        customClass={"buy-input"}
        label={""}
        value={buyamount}
        onChange={handleBuyAmount}
        showLabel={true}
        name={"buy"}
        placeholder={"Enter wallet amount"}
      />
      <Button 
        name={"buy-submit"}
        customClass={"buy-submit"}
        title={"Purchase"}
        onClick={BuySubmit}
        theme={"orange"}
      />
    </div>
  )
}
