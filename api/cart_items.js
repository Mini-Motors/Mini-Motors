const express = require('express');
const cartItemsRouter = express.Router();
const { requireUser } = require('./utils');
const { canEditCartItem, 
  getCartItemById,
  getCarItemsByCartId,
  updateCartItem,
  destroyCartItem } = require('../db/db_adaptors');


// PATCH /api/car_reviews/:carReviewId
cartItemsRouter.patch('/:carItemId', requireUser, async (req, res, next) => {
  const id = req.params.carItemId;
  const cartId = req.body.cartId;
  const userId = req.user.id;
  const username = req.user.username;
  try {
    const isValid = await canEditCartItem(id, userId);
    const cartItem = await getCartItemByCartId(cartId);
    const car = await getCarsById(cartItem.carId);
    if (!isValid) {
      throw ({
        error: "Unauthorized",
        name: "User",
        message:  UnauthorizedUpdateError(username, car.manufacturer)
      })
    } else {
      const updatedCartListing = await updateCarListing({
        id,
        currentPrice
      })
      res.send(updatedCartListing);
    }
  } catch (error) {
    next(error);
  }
});

// DELETE /api/car_reviews/:cartItemId
cartItemsRouter.delete('/:cartItemId', requireUser, async (req, res, next) => {
  const id = req.params.cartItemId;
  const userId = req.user.id;
  const username = req.user.username;
  try {
    const isValid = await canEditCartItem(id, userId);
    const cartItem= await getCartItemById(id);
    const car = await getCarById(cartItem.carId);
    if (!isValid) {
      throw ({
        statusCode: 403,
        error: "Unauthorized",
        name: "User",
        message:  UnauthorizedDeleteError(username, car.manufacturer)
      })
    } else {
      const deletedCartItem = await destroyCartItem(id);
      res.send(deletedCartItem);
    }
  } catch (error) {
    next(error);
  }
});

module.exports = cartItemsRouter;