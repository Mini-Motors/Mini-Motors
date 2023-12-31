import React, { Fragment, useEffect, useState } from "react";
import { updateCart, myData, myActiveCarts, getCarById } from '../ajax-requests/index'

const CarDetail = (props) => {

const { currentCar, cartId, setCartId, token, currentUser } = props;

const { id, manufacturer, model, color, price, type }= currentCar;

async function getActiveCart () {
  const activeCarts = await myActiveCarts(currentUser, token)
  const idValue = activeCarts[0].id;
  setCartId(idValue)
}

getActiveCart();

/* Need isLoggedIn useState for addToCart? */

  return (
    <Fragment>
      <h1>Car Details</h1>
      <div className="card-item">
        <div className="card-item">
          <div className="card-body">
            <img className="card-img" src="https://picsum.photos/250/200?image=480" alt="" />
            <h2 className="card-title center">Manufacturer</h2>
            <p className="card-text">{manufacturer}</p>
            <h2 className="card-title center">Model</h2>
            <p className="card-text">{model}</p>
            <h2 className="card-title center">Color</h2>
            <p className="card-text">{color}</p>
            <h2 className="card-title center">Price</h2>
            <p className="card-text">{price}</p>
            <h2 className="card-title center">Type</h2>
            <p className="card-text">{type}</p>
            <button className="btn" onClick={() => {
              updateCart(token, cartId, {carId: id})
              console.log("add to cart onClick firing")
              }}>Add to Cart</button>
              <button
              className="btn"
              onClick={() => {
                window.location.href = "/cart";
              }}
            >
              Go to Cart
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  )
};

// ADDED ADDITIONAL BUTTON FOR CART ROUTE//

export default CarDetail;
