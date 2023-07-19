import React, { Fragment, useEffect, useState } from "react";

import { myActiveCarts, deleteCartItem } from "../ajax-requests/index.js"; 
import { useNavigate } from "react-router-dom";
import '../style/Cart.css';


const Cart = (props) => {

  const [cartItems, setCartItems] = useState([]);

  const localToken = window.localStorage.getItem("token");
  const user = window.localStorage.getItem("currentUser");

  useEffect(() => {
    async function getCartItems() {
      try {
        const response = await myActiveCarts(user, localToken); 
        console.log(response); 
        setCartItems(response[0].cars);
        
      } catch (error) {
        console.error(`An error has occurred: ${error}`);
      }
    }
    getCartItems();
  },[]);

  useEffect(() => {
    console.log(cartItems);

  },[]);

return (
  <Fragment>
    <div className="cart-box">
      <h1>My Cart </h1>
      <div className="checkout">
                  <button>
                    Checkout
                  </button>
                </div>
    </div>
    {cartItems.map((cartItem) => (
      <Fragment key={cartItem.id}>
        <div className="cards">
          <div className="card-item">
            <div className="body">
    
              <h2> {cartItem.manufacturer}</h2>
              <p> {cartItem.type}</p>
              <p><strong>Model:</strong> {cartItem.model}</p>
              <p><strong>Color:</strong> {cartItem.color}</p>
              <p><strong>Price:</strong> ${cartItem.currentPrice}</p>
                <div>
                  <button
                  onClick={() => {
                      deleteCartItem(cartItem.cartItemId, localToken)
                      location.href="/cart"
                      }}> Delete Item
                  </button>
                </div>
            </div>
          </div>
        </div>
      </Fragment>
    ))}
  </Fragment>
);
};

export default Cart;



