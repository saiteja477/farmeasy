import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './AdminPage.css';

function AdminPage(props) {
    const history = useHistory();
    var [title, setTitle] = useState('');
    var [price, setPrice] = useState('');
    var [image, setImage] = useState('');
    var [rating, setRating] = useState('');
    const [error, setError] = useState(null)
    var [id, setId] = useState('');
    const username = 'saiteja'
    async function handleClick()
    {
        id = parseInt(id)
        price = parseInt(price)
        rating = parseInt(rating)

        let item = {username,id,title,price,image,rating};
       console.warn(item)
       fetch("http://127.0.0.1:5000/video",{
        method:'POST',
        body:JSON.stringify(item),
        headers:{
            "Content-Type":'application/json',
            "Accept":"application/json"
        }
    })
    .then(setId(''),setTitle(''),setImage(''),setPrice(''),setRating(''))
    .catch(error=>window.alert("Product with these Id already present"))
       
        //result = await result.json()
        //console.warn("result"+result)
    };
    const logout =() =>{

        history.push('/adminactions')
    }
  return <div className='adminpage'>
         <div>         
        <Link to='/'>
            
        </Link>
        <div className='adminpage__container'>
            <h1>Add Product</h1>
                <h5>Product ID</h5>
                <input type='text' value={id} onChange={e => setId(e.target.value)}/>

                <h5>Product title</h5>
                <input type='text' value={title} onChange={e => setTitle(e.target.value)} />

                <h5>Product Price</h5>
                <input type='text' value={price} onChange={e => setPrice(e.target.value)} />

                <h5>Product image URL</h5>
                <input type='text' value={image} onChange={e => setImage(e.target.value)} />

                <h5>Product Rating</h5>
                <input type='text' value={rating} onChange={e => setRating(e.target.value)} />

                <button className='adminpage__signInButton' onClick={handleClick}>Add Item</button>
                <button className='adminpage__signInButton' onClick={logout}>Back</button>

            <p>
               
            </p>
           
        </div>
        </div>
    </div>

}

export default AdminPage;
