import React,{useState} from 'react';
import './CheckoutProduct.css'
import { useStateValue } from './StateProvider';
import 'bootstrap/dist/css/bootstrap.min.css';

function CheckoutProduct({userName,id, image, title, price, rating, quantity}) {

    const [{user}] = useStateValue();

    const removeFromBasket = () => {
      /*dispatch({
          type: 'REMOVE_FROM_BASKET',
          id: id,
      })*/
      console.warn(id,user?.email)
      fetch("http://127.0.0.1:5000/cart/"+id+"/"+user?.email,{
        method:'DELETE',
        headers:{
            "Content-Type":'application/json',
            "Accept":"application/json"
        }
    })
    .then(window.location.reload())
  }  

  var freeDeliveryContent = ""
  if(price*quantity>50){
      freeDeliveryContent = "Eligible for free Delivery"
  }else{
      freeDeliveryContent = "Add $"+(50-(price*quantity))+" more for free Delivery"
  }

  return (
  <div className='checkoutProduct'>
     <img className='checkoutProduct__image' src={image} alt='' /> 
     <div className='checkoutProduct__info'>
        <p className='checkoutProduct__title'>{title}</p>
        <div className='product__rating'>
              {Array(rating).fill().map((_, i)=>(
                 <p>⭐</p>
              ))}
          </div>
          <div>
              <p>{freeDeliveryContent}</p>
              <b>Qty-</b>
            <b>{quantity}</b>
            </div>
      <button onClick={removeFromBasket}>Remove from Cart</button>
     </div>
     <strong className='checkoutProduct__price'>${price*quantity}</strong>
  </div>
  )
}

export default CheckoutProduct;
