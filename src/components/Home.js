import React, { Fragment, useEffect, useState } from "react";
import { allCars } from '../ajax-requests/index.js'


const Home = () => {


const [ allCars, setAllCars ] = useState({});

useEffect(() => {
  async function getAllCars () {
    try {
      const cars = await allCars();
      setAllCars(cars);
      console.log(allCars);
    } catch (error) {
      console.error(`An error has occurred: ${error}`);
    }
  }
  getAllCars();
}, []);

  return (
    <Fragment>

      <h1> Placeholder for home </h1>

      { allCars && allCars.map((car) => {
        return (
          <Fragment key={ car.id }>

          </Fragment>
          )
        }) 
      }

    </Fragment>
    
  )
};

export default Home;