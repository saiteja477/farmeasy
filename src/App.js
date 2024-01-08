import "./App.css";
import React, { useEffect,useState } from "react";
import Header from "./Header";
import Checkout from "./Checkout";
import Home from "./Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./Login";
import { auth } from "./firebase";
import { useStateValue } from "./StateProvider";
import Payment from "./Payment";
import Admin from "./Admin/Admin";
import AdminPage from "./Admin/AdminPage";
import Adminactions from "./Admin/Adminactions";
import UpdateItemDetails from "./Admin/UpdateItemDetails";
import Subtotal from "./Subtotal";
import Content from "./Content";
import Soiltesting from "./SoilTesting/Soiltesting";

//const promise = loadStripe("pk_test_51KOxO3SHUwlPVMMsdcp7TJOyowokvne0eMBFplgXQw1sjuOSImbI54CV1YPtw4MWBxzAIMzZHHgVRdKa6DTU7Ejr00TzNTEGFL");

function App() {
  const [{}, dispatch] = useStateValue();
  const [articles,setArticles] = useState([])
  const [cartData,setCartData] = useState([])
  //const [editedArticle,setEditedArticle] = useState([])
  localStorage.getItem("Products")

  useEffect(()=>{
      fetch('http://127.0.0.1:5000/video',{
          'methods':'GET',
          headers:{
              'Content-Type':'application.json'
          }
      })
      .then(resp => resp.json())
      .then(resp => setArticles(resp))
      .catch(error => console.log(error))
  },[])

  useEffect(()=>{
    fetch('http://127.0.0.1:5000/cart',{
        'methods':'GET',
        headers:{
            'Content-Type':'application.json'
        }
    })
    .then(resp => resp.json())
    .then(resp => setCartData(resp))
    .catch(error => setCartData(error))
  },[])
  

  useEffect(()=>{
    //will only run once when the app component loads..
    auth.onAuthStateChanged(authUser => {
      console.log('USER IS >>> ',authUser);

      if(authUser){
        //the user logged in
        dispatch({
          type: 'SET_USER',
          user: authUser
        })
      }else{
        //user is logged out
        dispatch({
          type: 'SET_USER',
          user:null,
        })
      }
    })
  },[])

  return(
    <Router>
    <div className='app'>
      <Switch>
      <Route path="/login">
          <Login />
        </Route>
        <Route path="/admin">
          <Admin />
        </Route>
       
        <Route path="/adminactions">
          <Adminactions/>
        </Route>
        <Route path="/adminpage">
          <AdminPage/>
        </Route>

        <Route path="/soiltesting">
          <Header />
          <Soiltesting />
        </Route>
        
        <Route path="/updateitem">
          <UpdateItemDetails />
        </Route>
        <Route path="/checkout">
          <Header cartData={cartData}/>
          <Checkout cartData={cartData}/>
        </Route>
        <Route path="/payment">
          <Header cartData={cartData}/>
          <Payment cartData={cartData}/>
        </Route>
        <Route path="/home">
          <Header cartData={cartData}/>
          <Home articles={articles}/>
        </Route>
        <Route path="/">
        <Header cartData={cartData}/>
         <Content />
        </Route>
      </Switch>
    </div>
    </Router>
  );
}

export default App
