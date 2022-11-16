
import React from 'react'
import { useState } from 'react';
import './LoginForm.css'

function LoginForm({login, register, error}) {


const [details, setDetails] = useState({username:"", password:"", portfolio:[]});

const [mode, setMode] = useState("");

const submitLoginHandler = e => {
    e.preventDefault();
    login(details);
}

const submitRegisterHandler = e =>{
    e.preventDefault();
    register(details);
}

const switchToRegister = e =>{
    e.preventDefault();
    setMode("register");
}

const switchToLogin = e =>{
    e.preventDefault();
    setMode("");
}

  return (

    <div>

        {mode === "" ? (
            <div className='form-wrapper'>
                <form onSubmit={submitLoginHandler} className="login-form">
                    <div className='form-inner'>
                        <h2>Login</h2>
                        
                        <div className='form-group'>
                            <label htmlFor='username'>Username</label>
                            <input type="text" name="username" id="usernameLogin" onChange={e => setDetails({...details, username: e.target.value})} value={details.username}></input>
                        </div>

                        <div className='form-group'>
                            <label htmlFor='password'>Password</label>
                            <input type="password" name="password" id="passwordLogin" onChange={e => setDetails({...details, password: e.target.value})} value={details.password}></input>
                        </div>

                        <input type="submit" value="LOGIN" className='btn'/>

                        <div className='register-link' onClick={switchToRegister}>
                            Register a new user
                        </div>
                    
                    </div>
                </form>
            </div>
        ) : (
            <div className='form-wrapper'>
                <form onSubmit={submitRegisterHandler}>
                    <div className='form-inner'>
                        <h2>Register </h2>
                        <div className='form-group'>
                            <label htmlFor='username'>Username</label>
                            <input type="text" name="usernameRegister" id="usernameRegister" onChange={e => setDetails({...details, username: e.target.value})} value={details.username}></input>
                        </div>

                        <div className='form-group'>
                            <label htmlFor='password'>Password</label>
                            <input type="password" name="passwordRegister" id="passwordRegister" onChange={e => setDetails({...details, password: e.target.value})} value={details.password}></input>
                        </div>
                        <div className='form-group'>
                            <label htmlFor='password'> Re-type Password</label>
                            <input type="password" name="passwordRegister" id="passwordRegister2" onChange={e => setDetails({...details, password: e.target.value})} value={details.password}></input>
                        </div>

                        <input type="submit" value="REGISTER" className='btn'/>

                        <div className='register-to-login-link' onClick={switchToLogin}>
                            Have an account? Login
                        </div>
                    </div>
                </form>
            </div>
            )
        }

    </div>
  )
      
}

export default LoginForm;