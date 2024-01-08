import React from 'react';
import "./Checkout.css";
import CheckoutProduct from '../src/CheckoutProduct';
//import { getBasketTotal } from './reducer';
import Subtotal from '../src/Subtotal';
import { useStateValue } from '../src/StateProvider';
import FlipMove from 'react-flip-move';

function Checkout() {

  const [{basket,user},dispatch] = useStateValue();  


  return (
  <div className='checkout'>
      <div className='checkout__left'>
          <img className='checkout__ad' src='https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668.jpg' alt='' /> 
        <div>
            <h3>Hello ,{user?.email}</h3>
            <h2 className='checkout__title'>
                Your Shopping Basket      
            </h2>
           {basket.map(item =>(
               item.userName==user?.email ?
               <CheckoutProduct 
               id={item.id}
               title={item.title}
               image={item.image}
               price={item.price}
               rating={item.rating}
               />
           : ''))}
        </div>
    </div>
    <div className='checkout__right'>
        <Subtotal />
    </div>
  </div>
  );
}

export default Checkout;
