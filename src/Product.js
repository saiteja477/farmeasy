import { Button } from '@material-ui/core';
import React,{useEffect,useState} from 'react';
import { Link, useHistory } from 'react-router-dom';
import "./Product.css";
import { useStateValue } from './StateProvider';
function Product({userName,id, title,image,price,rating }) {

    const history = useHistory();
    const [{user}, dispatch] = useStateValue();
    const [counter, setCounter] = useState(1);
    const [prodct,setProduct] = useState()
    let incrementCounter = () => setCounter(counter + 1);
    let decrementCounter = () => setCounter(counter - 1);

    if(counter<=1) {
        decrementCounter = () => setCounter(1);
      }
    //console.log("Basket"+JSON.stringify(basket));
    //console.log(basket.value);

    /*const addToBasket = () =>{
        // dispatch the item into the data layer
        dispatch({
            type: 'ADD_TO_BASKET',
            item: {
                userName: userName,
                id: id,
                title: title,
                image: image,
                price: price,
                rating: rating,
            },
        });
    };*/

    async function addToBasket()
    {
        var quantity = counter;
        var username =userName;
        let item = {username,id,title,price,image,rating,quantity};
        let updateItems = {title,price,image,rating,quantity};
        console.warn(item);
       //console.warn(item)
       fetch("http://127.0.0.1:5000/cart",{
        method:'POST',
        body:JSON.stringify(item),
        headers:{
            "Content-Type":'application/json',
            "Accept":"application/json"
        },
        
    })
    .then(resp=>resp.ok==true?window.location.reload():console.log(resp))
    .catch(()=>fetch("http://127.0.0.1:5000/cart/"+id+"/"+username,{
        method:'PATCH',
        body:JSON.stringify(updateItems),
        headers:{
            "Content-Type":'application/json',
            "Accept":"application/json"
        }
    })
    .then(resp=>console.log(resp.body))
    .then(window.location.reload())
    )
    history.push('/checkout')
   // window.location.reload();
       
        //result = await result.json()
        //console.warn("result"+result)
    };
    const userLogin = () =>{
        alert("SIGN-IN TO ADD ITEMS");
    }



  return <div className='product'>
      <div className='product__info'>
          <h5>{title}</h5>
          <p className='product__price'>
              <small>₹</small>
              <strong>{price}/kg</strong>
          </p>
          <div className='product__rating'>
              {Array(rating).fill().map((_, i)=>(
                 <p>⭐</p>
              ))}
             
          </div>
      </div>
      <img src={image} alt='' />
      <div className='product__buttons'>
      <button className='product__increment' type='button' onClick={decrementCounter}>-</button>
     <button className='product__increment' type='button'>{counter}</button>
      <button type='button' className='product__increment' onClick={incrementCounter}>+</button>
      </div>
      <button className='product__addtocart' type='button' onClick={user? addToBasket: userLogin}>Add to Basket</button>
  </div>;
}

export default Product;
