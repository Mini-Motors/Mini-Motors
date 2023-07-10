import React, { Fragment, useEffect, useState } from "react";
import { allCars as fetchAllCars } from '../ajax-requests/index.js'


const Home = (props) => {

const { token , currentCar, setCurrentCar } = props;
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
},  [ allCars ] );

  return (
    <Fragment>
      <h1> All Mini Motor Listings </h1>
      { allCars && allCars.map((car) => {
        return (
          <Fragment key={ car.id }>
            <div class="cards">
              <div class="card-item">
                <div class="card-body">
                  <img class="card-img" src="https://picsum.photos/250/200?image=480" alt="" />
                  <h2 class="card-title center">Manufacturer</h2>
                  <p class="card-text">{car.manufacturer}</p>
                  <h2 class="card-title center">Model</h2>
                  <p class="card-text">{car.model}</p>
                  <h2 class="card-title center">Type</h2>
                  <p class="card-text">{car.type}</p>
                  <h2 class="card-title center">Color</h2>
                  <p class="card-text">{car.color}</p>
                  <h2 class="card-title center">Price</h2>
                  <p class="card-text">{car.price}</p>
                  <div class="card-footer center">
                    <a class="btn" href="/cardetail" onClick={() => setCurrentCar(car.id)}>Details</a>
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