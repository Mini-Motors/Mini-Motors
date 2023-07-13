import React, { useState, useEffect } from "react";
import { registeredUser, createCart, myActiveCarts } from "../ajax-requests/index.js";

const Login = (props) => {
  const { setToken, token, setCurrentUser, currentUser, setCartId, cartId } = props;
  const [ username, setUsername ] = useState("");
  const [ password, setPassword ] = useState("");
   
  async function handleSubmit(event) {
    event.preventDefault();
    const user = { username, password };
    const results = await registeredUser(user);  
      
    if (!results.error) {
      setToken(results.token);
      console.log(results)
      window.localStorage.setItem("token",results.token);
      setCurrentUser(username);
      window.localStorage.setItem("currentUser",username);
      const activeCarts = await myActiveCarts(currentUser, token)

      if (!activeCarts) {
        const cart = {
            favorites: false,
          }
          const setCart = await createCart(token, cart);
          setCartId(setCart.id);
      } else {
        setCartId(setCart.id);
        console.log(cartId)
      }
      
      // location.href = "/";
    } else {
      window.alert("Username and/or Password not accepted!")
    }
  };

  return (
    <form id="login" onSubmit={ handleSubmit }>
      <div>
        <input
          type="text"
          placeholder="Enter Username"
          onChange={(event) => setUsername(event.target.value)}
        />
      </div>
      <br />
      <div>
        <input
          type="password"
          placeholder="Enter Password"
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>
      <br />
      <button type="submit">Login</button>
    </form>
  )
}

export default Login;
