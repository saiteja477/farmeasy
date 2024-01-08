import React from 'react';
import "./Subtotal.css";
import CurrencyFormat from 'react-currency-format';
import { useStateValue } from './StateProvider';
import { useHistory } from 'react-router-dom';

function Subtotal(props) {
  const history = useHistory();
  const [{basket,user},dispatch] = useStateValue();  

  const newBasket = [];


  const getBasketTotal = (newBasket)=>
  user?
  newBasket?.reduce((amount, item)=>(item.username==user?.email? item.price+amount:0),0): basket?.reduce((amount,item)=>0,0);



  return <div className='subtotal'>
       <CurrencyFormat
        renderText={(value)=>(
            <>
            <p>
                Subtotal ({newBasket.length} items): <strong>{value}</strong>
            </p>
            <small className='subtotal__gift'>
                <input type='checkbox'/>This Order
                 contains a gift.
            </small>
            </>
        )}
        decimalScale={2}
        value={getBasketTotal(newBasket)}
        displayType={"text"}
        thousandSeperator={true}
        prefix={"$"}
        />
        <button onClick={e => history.push('/payment')}>Proceed to checkout</button>
  </div>;
}

export default Subtotal;
