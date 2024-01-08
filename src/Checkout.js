import React, { useEffect,useState } from "react";
import "./Checkout.css";
import "./Subtotal.css";
import Subtotal from "./Subtotal";
import { useStateValue } from "./StateProvider";
import CheckoutProduct from "./CheckoutProduct";
import CurrencyFormat from 'react-currency-format';
import { useHistory } from 'react-router-dom';

function Checkout(props) {
  const history = useHistory();
  const [{ basket,cartData, user }, dispatch] = useStateValue();
  const [passcartData,setpassCartData] = useState([])

  const newBasket = [];
  var count=0;
  console.log(props.passcartData)
  props.cartData && props.cartData.map(item =>(
    console.log(item),
    item.username==user?.email ?  
    newBasket.push(item)
: newBasket,
item.username==user?.email?
    count+=item.quantity:0

)
)
const getBasketTotal = (newBasket)=>
  user?
  newBasket?.reduce((amount, item)=>(item.username==user?.email? (item.price*item.quantity)+amount:0),0): basket?.reduce((amount,item)=>0,0);


  return (
    <div className="checkout">
      <div className="checkout__left">
        <img
          className="checkout__ad"
          src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg"
          alt=""
        />

        <div>
          <h3>Hello, {user?.email}</h3>
          <div className="checkout__product">
          <h2 className="checkout__title">Your shopping Basket</h2>
          {props.cartData && props.cartData.map(item => (
            item.username==user?.email ? 
            <div className="checkout__item">
            <CheckoutProduct
              id={item.id}
              title={item.title}
              image={item.image}
              rating={item.rating}
              quantity={item.quantity}
              price={item.price}
            />
            </div>
          :""))}

        </div>
        </div>
      </div>
            
      <div className="checkout__right">
        <div className="subtotal">
      <CurrencyFormat
        renderText={(value)=>(
            <>
            <p>
                Subtotal ({count} items): <strong>{value}</strong>
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
        <button onClick={() => history.push('/payment')}>Proceed to checkout</button>
      </div>
      </div>
    </div>
  );
}

export default Checkout;
