const express = require('express');
const cartItemsRouter = express.Router();
const { requireUser } = require('./utils');
const { canEditCartItem, 
  getCartItemById,
  updateCartItem,
  destroyCartItem } = require('../db/db_adaptors');


// PATCH /api/cart_items/:cartItemId
cartItemsRouter.patch('/:cartItemId', requireUser, async (req, res, next) => {
  const id = req.params.cartItemId;
  const userId = req.user.id;
  const username = req.user.username;
  try {
    const isValid = await canEditCartItem(id, userId);
    const cartItem = await getCartItemById(id);
    const car = await getCarsById(cartItem.carId);
    if (!isValid) {
      throw ({
        error: "Unauthorized",
        name: username,
        message:  "Not authorized to updated cart item."
      })
    } else {
      const updatedCartItem = await updateCartItem({
        id,
        currentPrice
      })
      res.send(updatedCartItem);
    }
  } catch (error) {
    next(error);
  }
});

// DELETE /api/cart_items/:cartItemId
cartItemsRouter.delete('/:cartItemId', requireUser, async (req, res, next) => {
  const id = req.params.cartItemId;
  const userId = req.user.id;
  const username = req.user.username;
  try {
    const isValid = await canEditCartItem(id, userId);
    if (!isValid) {
      throw ({
        statusCode: 403,
        error: "Unauthorized",
        name: username,
        message:  "Not authorized to delete cart item!"
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