import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './Login.css';
import { auth } from "./firebase";

function Login() {
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signIn = e =>{
        e.preventDefault();

        auth
            .signInWithEmailAndPassword(email, password)
            .then(auth=>{
                history.push('/');
            })
            .catch(error=>alert(error.message));

        //firebase
    }
    const register = e => {
        e.preventDefault();
        auth
            .createUserWithEmailAndPassword(email, password)
            .then((auth)=>{
                //Successfully created new User
                console.log(auth);
                if(auth){
                    history.push('/');
                }
            })
            .catch(error=>alert(error.message))
        //firebase
    }
  return (
    <div className='login'>
        
        <div className='login__container'>
            <h1>Sign-in</h1>
            <form>
                <h5>E-mail</h5>
                <input type='text' value={email} onChange={e => setEmail(e.target.value)}/>

                <h5>Password</h5>
                <input type='password' value={password} onChange={e => setPassword(e.target.value)} />

                <button className='login__signInButton' type='submit' onClick={signIn}>Sign In</button>
            </form>
            <p>
                By signing-in you agree to Farm Easy Conditions of Use.
            </p>
            <button className='login__registerButton' onClick={register}>Create your Account</button>
        </div>
    </div>
  
  )
}

export default Login;
