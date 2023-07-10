import React, { Fragment, useEffect, useState } from "react";
import { getCarById } from '../ajax-requests/index'

const CarDetail = (props) => {

const { currentCar } = props;
const [ carDetails, setCarDetails ] = useState({});

useEffect(() => {
  async function getCarDetail () {
    try {
      const carDetail = await getCarById(currentCar);
      setCarDetails(carDetail);
    } catch (error) {
      console.error(`An error has occurred: ${error}`);
    } 
  }
  getCarDetail();
}, []);

useEffect (() => {
  console.log(carDetails);
}, [ carDetails ])

  return (
    <Fragment>
      <h1>Car Details</h1>
      <h2>{carDetails.manufacturer}</h2>
    </Fragment>
  )
};

export default CarDetail;
