const express = require('express');
const cartRouter = express.Router();
const { requireUser, requireAdmin } = require("./utils");
const { 
  getAllActiveCarts,
  createCart,
  destroyCart,
  getCartById,
  updateCart,
  addCarToCartItems,
  getCarsById } = require('../db/db_adaptors')

// GET /api/cart
cartRouter.get('/', requireAdmin, async (req, res, next) => {
  try {
    const activeCarts = await getAllActiveCarts();
    res.send(activeCarts);
  } catch (error) {
    next(error);
  }
});

// POST /api/cart
cartRouter.post('/', async (req, res, next) => {
  const { favorites } = req.body;
  if (!req.user) {
    next({
      error: "No user found",
      message: "Unauthorized attempt to add to cart.",
      name: "Unauthorized Error"
    })
  }
  try {
    const newCart = await createCart({
      creatorId: req.user.id, 
      isActive: true,
      favorites: favorites,
    });
    res.send(newCart);
  } catch (error) {
    next(error);
  }
});

// POST /api/cart/:cartId/cars
cartRouter.post('/:cartId/cars', async (req, res, next) => {
  const { cartId } = req.params;
  const { carId } = req.body;
  const car = await getCarsById(carId);
  const newCarToAdd = {
    cartId: cartId,
    carId: carId,
    currentPrice: car.price
  }
  try {
    const attachedCars = await addCarToCartItems(newCarToAdd);
    res.send(attachedCars);
  } catch (error) {
    next({
      error: "Duplicate key",
      message: "Duplicate car added, update qty instead.",
      name: "Duplicate Cart_Item Error"
    });
  }
});

// PATCH /api/cart/:cartId
cartRouter.patch('/:cartId', async (req, res, next) => {
  const user = req.user;
  const { cartId } = req.params;
  const { isActive, favorites } = req.body;
  const updateFields = { id: cartId };
  if (!user) {
    next({
      error: "No user found",
      message: UnauthorizedError(),
      name: "Unauthorized Error"
    })
  }
  if (isActive === true || isActive === false) {  
    updateFields.isActive = isActive;
  }
  if (favorites) {
    updateFields.favorites = favorites;
  }
  try {
    if (cartId === 'undefined') {
      throw ({
        error: "Unauthorized",
        name: "User",
        message:  "Cart id is undefined!"
      })
    } else  {
      const cart = await getCartById(cartId);
      if (user.id !== cart.creatorId) {
        res.status(403).send({
          error: "Unauthorized to update this cart",
          message: UnauthorizedUpdateError(req.user.username, cart.id),
          name: "Unauthorized Update Error"
        });
      }
    }
    const updatedCart = await updateCart(updateFields);
    res.send(updatedCart);
  } catch (error) {
    next(error);
  }
});

// DELETE /api/cart/:cartId
cartRouter.delete('/:cartId', async (req, res, next) => {
  const creatorId = req.user.id;
  const { cartId } = req.params;
  try {
    const cart = await getCartById(cartId);
    if (creatorId !== cart.creatorId) {
      res.status(403).send({
        error: "Unauthorized to delete this cart",
        message: UnauthorizedDeleteError(req.user.username, cart.id),
        name: "Unauthorized Delete Error"
      });
    }
    await destroyCart(cartId);
    res.send(cart);
  } catch (error) {
    next(error);
  }
});



module.exports = cartRouter;

