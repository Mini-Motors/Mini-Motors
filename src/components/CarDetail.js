import React, { Fragment, useEffect, useState } from "react";
import { getCarById } from '../ajax-requests/index'

const CarDetail = (props) => {

const { currentCar } = props;

useEffect(() => {
  async function getCarDetail () {
    try {
      console.log(currentCar)
      const car = await getCarById(currentCar);
      return car;
    } catch (error) {
      console.error(`An error has occurred: ${error}`);
    } 
  }
  getCarDetail();
}, []);

  return (
    <h1>Car Details</h1>
  )
};

export default CarDetail;
