import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { registerUser } from "../ajax-requests/index.js";

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
      const user = { username, password, admin };
      const results = await registerUser(user);

      if (!results.error) {
        setToken(results.token);
        window.localStorage.setItem("token", results.token);
        setCurrentUser(username);
        window.localStorage.setItem("currentUser", username);
        location.href = "/";
      } else if (results.error === "A user by that username already exists") {
        alert("A user by that username already exists! Please create a different username or login if this is your username.")
      }
    }
  }

  return (
    <main>
      <nav id="navbar">
      { !token
        ? <Fragment>
            <Link to="/login">Login</Link>
            <br/>
            <Link to="/">Back to Car Listings</Link>
          </Fragment>
        : window.location.href="/"
      }
      </nav>
      <section className="registerContainer">
        <div id="register">
          <form onSubmit={ handleSubmit }>
          <h2>Create a New Account</h2>
            <input
              type="text"
              placeholder="Create Username"
              onChange={(event) => setUsername(event.target.value)} // passing 'event' captures the input
              required
            />
            <input
              type="password"
              placeholder="Create Password"
              onChange={(event) => setPassword(event.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Re-enter Password"
              onChange={(event) => setConfirmPassword(event.target.value)}
              required
            />
            <label id="checkbox">Make Admin?</label>
            <input 
              type="checkbox"
              value="false"
              onClick={(event) => {setAdmin(event.target.checked)}}
            />            
            <button type="submit">Register</button>
          </form>
        </div>
      </section>
    </main>
  )
}

export default Register;