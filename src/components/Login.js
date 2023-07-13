import React, { Fragment, useState, useEffect } from "react";
import { registeredUser, createCart, myActiveCarts } from "../ajax-requests/index.js";
import '../style/Login.css';


const Login = (props) => {
  const { setToken, setCurrentUser, setCartId } = props;
  const [ username, setUsername ] = useState("");
  const [ password, setPassword ] = useState("");
   
  async function handleSubmit(event) {
    event.preventDefault();
    const user = { username, password };
    const results = await registeredUser(user);  
    console.log(password)
      
    if (!results.error) {
      setToken(results.token);
      window.localStorage.setItem("token",results.token);
      console.log(results.token)
      setCurrentUser(username);
      window.localStorage.setItem("currentUser",username);
      
      const activeCarts = await myActiveCarts(username, results.token)

      if (!activeCarts) {
        const cart = {
            favorites: false,
          }
          const setCart = await createCart(results.token, cart);
          setCartId(setCart.id);
      } else {
        setCartId(activeCarts.id);
      }
      //  location.href = "/";
    } else {
      window.alert("Username and/or Password not accepted!")
    }
  };

  return (
      <div className="login-page">
      <div className="form">
        <div className="login">
          <div className="login-header">
            <h3>LOGIN</h3>
            <p>Please enter your credentials to login.</p>
          </div>
        </div>
        <form className="login-form" onSubmit={ handleSubmit }>
          <input type="text" placeholder="username" onChange={(event) => setUsername(event.target.value)}/>
          <input type="password" placeholder="password" onChange={(event) => setPassword(event.target.value)}/>
          <button type="submit">login</button>
          <p className="message">Not registered? <a href="/register">Create an account</a></p>
          <p className="message">Get outta here...<a href="/">Take me home!</a></p>
        </form>
      </div>
    </div>
  )
}

export default Login;
