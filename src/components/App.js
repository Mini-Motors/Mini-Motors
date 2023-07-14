import React, { useState, useEffect } from 'react';
// getAPIHealth is defined in our axios-services directory index.js
// you can think of that directory as a collection of api adapters
// where each adapter fetches specific info from our express server's /api route
import { getAPIHealth, myData, myActiveCarts, getCarById} from '../ajax-requests';
import { Route, Routes } from 'react-router-dom';
import { Login, Register, Home, Cart, CarDetail } from "./";
import '../style/App.css';

const App = () => {
  const [ APIHealth, setAPIHealth ] = useState('');
  const [ token, setToken ] = useState('');
  const [ cartId, setCartId ] = useState('');
  const [ currentUser, setCurrentUser ] = useState({});
  const [ isAdmin, setIsAdmin ] = useState(false);
  const [ isActive, setIsActive ] = useState(true);
  const [ isFavorites, setIsFavorites ] = useState(false);
  const [ currentCar, setCurrentCar ] = useState("");
  
  // useEffect(() => {
  //   // follow this pattern inside your useEffect calls:
  //   // first, create an async function that will wrap your axios service adapter
  //   // invoke the adapter, await the response, and set the data
  //   const getAPIStatus = async () => {
  //     const { healthy } = await getAPIHealth();
  //     setAPIHealth(healthy ? 'api is up! :D' : 'api is down :/');
  //   };

  //   // second, after you've defined your getter above
  //   // invoke it immediately after its declaration, inside the useEffect callback
  //   getAPIStatus();

  // }, []);

    async function tokenCheck() {
    const localToken = window.localStorage.getItem("token");
    const user = window.localStorage.getItem("currentUser");
    if(localToken) {
      setToken(localToken);
      setCurrentUser(user);
      const { username } = await myData(localToken);
    }
  }

  const handleCarUpdate = async (value) => {
    const thisCar = await getCarById(value);
    setCurrentCar(thisCar);
  }

  useEffect(() => {
    tokenCheck();
  }, [ token ]);

  useEffect(() => {
    handleCarUpdate();
  }, []);

  return (
    <div className="app-container">


      <Routes>
        <Route path="/" element={ 
          <Home 
            APIHealth={ APIHealth }
            token={ token } 
            isAdmin={ isAdmin } 
            setCurrentCar={ setCurrentCar } 
            currentCar={ currentCar } 
            updateCar={ handleCarUpdate }
          />}
        />

        <Route path="/login" element={ 
          <Login 
            currentUser={ currentUser } 
            setCurrentUser={ setCurrentUser } 
            cartId={ cartId } 
            setCartId={ setCartId } 
            setToken={ setToken }
            token={ token } 
          />}
        />

        <Route path="/register" element={ 
          <Register 
            setToken={ setToken } 
            isAdmin={ isAdmin } 
            setIsAdmin={ setIsAdmin } 
            setCurrentUser={ setCurrentUser } 
          />}
        />

        <Route path="/cart" element={ 
          <Cart setToken={ setToken } 
            isAdmin={ isAdmin } 
            setIsAdmin={ setIsAdmin } 
            setIsActive={ setIsActive } 
            isActive={ isActive } 
            setIsFavorites={ setIsFavorites } 
            isFavorites={ isFavorites } 
          />}
        />

        <Route path="/:carId" element={ 
          <CarDetail 
            currentCar={ currentCar }
            currentUser={ currentUser }
            setCartId={ setCartId }
            cartId={ cartId } 
            token={ token }
          />} 
        />
      </Routes>
    </div>
  );
};

export default App;
