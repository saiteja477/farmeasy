import React from 'react';
import CheckoutProduct from './CheckoutProduct';
import './Payment.css';
import { useStateValue } from './StateProvider';

function Payment(props) {
    const [{basket,user},dispatch] = useStateValue();  
    
  return(
       <div className='payment'>
          <div className='payment__container'>
              <h1>Checkout
                 Below Items</h1>
              <div className='payment__section'>
                <div className='payment__title'>
                    <h3>Delivary Address</h3>
                </div>
                <div className='payment__address'>
                    <p>{user?.email}</p>
                    <p>456 Tampa</p>
                    <p>South Florida</p>
                    <p>United states of America 1111</p>
                </div>
              </div>
              <div className='payment__section'>
                  <div className='payment__title'>
                      <h3>Review items for delivary</h3>
                  </div>
                  <div className='payment__items'>
                      {props.cartData && props.cartData.map(item => (
                          item.username==user?.email ?
                          <CheckoutProduct 
                            id={item.id}
                            title={item.title}
                            image={item.image}
                            rating={item.rating}
                            quantity={item.quantity}
                            price={item.price}
                          />
                      : ''))}
                  </div>
              </div>
              <div className='payment__section'>
                  <div className='payment__title'>
                  <h3>Payment Method</h3>
                  </div>
                  <div className='payment__details'>
                    
                  </div>

              </div>
          </div>
       </div>
  )
}

export default Payment;
