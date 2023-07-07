import React, { useState, useEffect, Component } from 'react';
// getAPIHealth is defined in our axios-services directory index.js
// you can think of that directory as a collection of api adapters
// where each adapter fetches specific info from our express server's /api route
import { getAPIHealth } from '../ajax-requests';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Login, Register, Home } from "./";
import '../style/App.css';


const App = () => {
  const [ APIHealth, setAPIHealth ] = useState('');
  const [ token, setToken] = useState(false);
  const [ cartId, setCartId ] = useState('');
  const [ currentUser, setCurrentUser ] = useState('');
    const [ isAdmin, setIsAdmin ] = useState(false);




  useEffect(() => {
    // follow this pattern inside your useEffect calls:
    // first, create an async function that will wrap your axios service adapter
    // invoke the adapter, await the response, and set the data
    const getAPIStatus = async () => {
      const { healthy } = await getAPIHealth();
      setAPIHealth(healthy ? 'api is up! :D' : 'api is down :/');
    };

    // second, after you've defined your getter above
    // invoke it immediately after its declaration, inside the useEffect callback
    getAPIStatus();
  }, []);

  return (
    <div className="app-container">
    

    <Router>
      <h1>Hello, World!</h1>
      <p>API Status: {APIHealth}</p>

      <h2 className="homeTitle">Mini-Motors</h2>
      <h3>Scale model replicas of your favorite cars!</h3>

        <Switch>
          <Route exact path="/" component={ 
            <Home 
            />}
          />

          <Route path="/login" component={ 
            <Login
              currentUser={ currentUser }
              setCurrentUser={ setCurrentUser }
              cartId={ cartId } 
              setCartId={ setCartId }
              setToken={ setToken } 
            />}
          />

          <Route path="/register" component={ 
            <Register 
              setToken={ setToken }
              isAdmin={ isAdmin } 
              setIsAdmin={ setIsAdmin } 
            />}
          />
        </Switch>  
    </Router>

    </div>
  );
};

export default App;
