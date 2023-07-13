import React, { Fragment, useEffect, useState } from "react";
import { allCars as fetchAllCars } from '../ajax-requests/index.js'
import '../style/Home.css';

const Home = (props) => {

const { token, setCurrentCar, currentCar, APIHealth } = props;
const [ allCars, setAllCars ] = useState([]);

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

useEffect(() => {
  console.log(allCars)
  console.log(currentCar)
},  [ allCars, currentCar ] );

  return (
    <Fragment>
      <h1>Hello, World!</h1>
      <p>API Status: {APIHealth}</p>

      <h2 className="homeTitle">Mini-Motors</h2>
      <h3>Scale model replicas of your favorite cars!</h3>

      <h1> All Mini Motor Listings </h1>
      { allCars && allCars.map((car) => {
        return (
          <Fragment key={ car.id }>
            <div className="cards">
              <div className="card-item">
                <div className="card-body">
                  <img className="card-img" src="https://picsum.photos/250/200?image=480" alt="" />
                  <h2 className="card-title center">Manufacturer</h2>
                  <p className="card-text">{car.manufacturer}</p>
                  <h2 className="card-title center">Model</h2>
                  <p className="card-text">{car.model}</p>
                  <h2 className="card-title center">Type</h2>
                  <p className="card-text">{car.type}</p>
                  <h2 className="card-title center">Color</h2>
                  <p className="card-text">{car.color}</p>
                  <h2 className="card-title center">Price</h2>
                  <p className="card-text">{car.price}</p>
                  <div className="card-footer center">
                    <a className="btn" href="#" onClick={() => setCurrentCar(car.id)}>Details { car.id }</a>
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