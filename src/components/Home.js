import React, { Fragment, useEffect, useState } from "react";
import { allCars as fetchAllCars } from '../ajax-requests/index.js'
import { useNavigate, useParams } from "react-router-dom";
import '../style/App.css';

const Home = (props) => {

const { token, setCurrentCar, currentCar, APIHealth, updateCar } = props;
const [ allCars, setAllCars ] = useState([]);
let {carId} = useParams
const navigate=useNavigate();

useEffect(() => {
  async function getAllCars () {
    try {
      const cars = await fetchAllCars();
      setAllCars(cars)
    } catch (error) {
      console.error(`An error has occurred: ${error}`);
    }
  }
  getAllCars();
}, []);

// useEffect(() => {
//   console.log(allCars)
//   console.log(currentCar)
// },  [ allCars, currentCar ] );

  return (
    <Fragment>
      <h2 className="homeTitle">Mini-Motors</h2>
      <h3 className="homeDesc">Scale model replicas of your favorite cars!</h3>

      <h1> All Mini Motor Listings </h1>
      
      <nav class="main-nav">
          <ul class="horizontal nav-list">
            <li><a href="">Big Deals</a></li>
            <li><a href="">Top Brands</a></li>
            <li><a href="">Suggestions</a></li>
            <li><a href="">Help & Contact</a></li>
            <li><a href="/login">Log In</a></li>
            <li><a href="/register">Register</a></li>
            <li><a href="/cart"><i class="material-icons">shopping_cart</i></a></li>
          </ul>
          <ul class="horizontal nav-list full-width">
            
          </ul>
          <ul class="horizontal nav-list short-width">
            <li><a href=""><i class="material-icons">menu</i></a></li>
          </ul>
        </nav>
        <nav class="sub-nav">
          <span class="company-name">
            Mini-motor
          </span>
          <form class="search-form" action="/search">
            <input type="text" name="search-term" placeholder="search">
            <button type="submit"><i class="material-icons">search</i></button>
            </input>
          </form>
          <a class="credit-offer" href="/credit">0% Financing 24 Months</a>
        </nav>

      { allCars && allCars.map((car) => {
        return (
          <Fragment key={ car.id }>
            <div className="cards" >
              <div className="card-item"onClick={() => {
                      carId=car.id;
                      updateCar(carId);
                      navigate(`/${carId}`);
                      }}>
                <div className="card-body">
                  <img className="card-img" src="https://picsum.photos/250/200?image=480" alt="" />
                  <h2 className="card-title center">Model</h2>
                  <p className="card-text">{car.model}</p>
                  <h2 className="card-title center">Price</h2>
                  <p className="card-text">{car.price}</p>
                  <div className="card-footer center">
                  </div>
                </div>
              </div>
            </div>
          </Fragment>
          )
        }) 
      }
    </Fragment>
  )
};

export default Home;