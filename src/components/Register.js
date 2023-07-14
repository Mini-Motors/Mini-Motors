import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { registerUser } from "../ajax-requests/index.js";
import '../style/Register.css';

const Register = ({ setToken, token, setCurrentUser, setIsAdmin, isAdmin }) => {
  const [ username, setUsername ] = useState("");
  const [ password, setPassword ] = useState("");
  const [ confirmPassword, setConfirmPassword ] = useState("");
  const [ admin, setAdmin ] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords don't match!")
    } else {
      setIsAdmin(admin)
      const user = { username, password, isAdmin };
      const results = await registerUser(user);
      console.log(results);

      if (!results.error) {
        // setToken(results.token);
        // window.localStorage.setItem("token", results.token);
        // setCurrentUser(username);
        // window.localStorage.setItem("currentUser", username);
        location.href = "/login";
      } else if (results.message === "Username is already taken. Please choose another!") {
        alert("A user by that username already exists! Please create a different username or login if this is your username.")
      } else if (results.message === "Password must be greater than 8 character!") {
        alert("Your password must be greater than 8 characters.  Please try again.")
      }
    }
  }

  return (
    <div className="register-page">
      <div className="form">
        <div className="register">
          <div className="register-header">
            <h3>REGISTER</h3>
            <p>Please enter your credentials to register.</p>
          </div>
        </div>
        <form className="register-form" onSubmit={ handleSubmit }>
          <input type="text" placeholder="username" onChange={(event) => setUsername(event.target.value)} required />
          <input type="password" placeholder="password" onChange={(event) => setPassword(event.target.value)} required />
          <input type="password" placeholder="re-enter password" onChange={(event) => setConfirmPassword(event.target.value)} required/>
          <button type="submit">Register</button>
          <br/>
          <br/>
          { !token
          ? <Fragment>
              <p className="message">Already registered? <a href="/login">Login Page</a></p>
              <p className="message">Get outta here...<a href="/">Take me home!</a></p>
            </Fragment>
          : window.location.href="/"
          }
        </form>
      </div>
    </div>
  )
}

export default Register;