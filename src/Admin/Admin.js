import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './Admin.css';
import { auth } from "../firebase";
import { loggedOut } from './Adminactions';
export var loggedIn = false;
function Admin() {
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    

    loggedOut?loggedIn=false:loggedIn=true;

    const signIn = e =>{
       if(email=='saitejachigullapalli@gmail.com' && password=='saiteja123'){
        history.push('/adminactions')
           loggedIn = true;
       }
        //firebase
    }
    
  return (
    <div className='admin'>
        <Link to='/'>
            
        </Link>
        <div className='admin__container'>
            <h1>Sign-in</h1>
            <form>
                <h5>E-mail</h5>
                <input type='text' value={email} onChange={e => setEmail(e.target.value)}/>

                <h5>Password</h5>
                <input type='password' value={password} onChange={e => setPassword(e.target.value)} />

                <button className='admin__signInButton' type='submit' onClick={signIn}>Sign In</button>
            </form>
            <p>
                By signing-in you agree to Amazon's Conditions of Use.
            </p>
           
        </div>
    </div>
  
  )
}

export default Admin;
