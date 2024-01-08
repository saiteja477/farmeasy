import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import {loggedIn} from './Admin.js'
import Admin from "./Admin";
export var loggedOut = false;

function Adminactions() {
    const history = useHistory();

   const adminpage = e=>{
       history.push('/adminpage')
   } 

   const updateItem = e =>{
       history.push('/updateitem')
   }
   

   const logout = e=>{
       history.push('/admin')
       loggedOut = true;
   }
   
  
  return loggedIn?(<div className='adminactions'>
      <button className='btn btn-primary' onClick={updateItem}>Update Item </button>
      <button className='btn btn-success' onClick={adminpage}>Add Item</button>
      <button className='btn btn-danger'>Delete Item</button>
      <button className='btn btn-dark' onClick={logout}>Log Out</button>
  </div>):<Admin/>;
}

export default Adminactions;
