const client = require('../client');
const { attachCarsToCarts } = require ("./cars")

async function createCart({ creatorId, isActive, favorites }) {
  try {
    const { rows: [ cart ] } = await client.query(/*sql*/`
      INSERT INTO cart ("creatorId", "isActive", favorites) 
      VALUES ($1, $2, $3)
      RETURNING *;
    `, [ creatorId, isActive, favorites ]);
    return cart;
  } catch (error) {
    console.error("Error creating cart!", error);
    throw error;
  }
}

async function getCartById(id) {
  try {
    const { rows: [ cart ] } = await client.query(/*sql*/`
      SELECT *
      FROM cart
      WHERE id = $1;
    `, [ id ]);
    return cart;
  } catch (error) {
    console.error("Error getting cart by id!", error);
    throw error;
  }
}

async function getCartsWithoutCars() {
  try {
    const { rows } = await client.query(/*sql*/`
      SELECT * 
      FROM cart    
    `);
    return rows;
  } catch (error) {
    console.error("Error getting routines without and activity!", error);
    throw error;
  }
}

async function getAllCarts() {
  try {
    const { rows: cart } = await client.query(/*sql*/`
      SELECT cart.*, users.username AS "creatorName"
      FROM cart
      INNER JOIN users
      ON cart."creatorId" = users.id;   
    `);
    return await attachCartsToCars(cart);
  } catch (error) {
    console.error("Error getting all carts!", error);
    throw error;
  }
}

async function getAllFavoriteCarts() {
  try {
    const { rows: cart } = await client.query(/*sql*/`
      SELECT cart.*, users.username AS "creatorName"
      FROM cart
      INNER JOIN users
      ON cart."creatorId" = users.id
      WHERE cart.favorites = true;   
    `);
    return await attachCarsToCarts(cart);
  } catch (error) {
    console.error("Error getting all favorite carts!", error);
    throw error;
  }
}

async function getAllActiveCarts() {
  try {
    const { rows: cart } = await client.query(/*sql*/`
      SELECT cart.*, users.username AS "creatorName"
      FROM cart
      INNER JOIN users
      ON cart."creatorId" = users.id
      WHERE cart."isActive" = true;   
    `);
    return await attachCarsToCarts(cart);
  } catch (error) {
    console.error("Error getting all active carts!", error);
    throw error;
  }
}

async function getAllCartsByUser({ username }) {
  try {
    const { rows: cart } = await client.query(/*sql*/`
      SELECT cart.*, users.username AS "creatorName"
      FROM cart
      INNER JOIN users
      ON cart."creatorId" = users.id
      WHERE users.username = $1;   
    `, [ username ]);
    return await attachCarsToCarts(cart);
  } catch (error) {
    console.error("Error getting all carts by user!", error);
    throw error;
  }
}

async function getFavoriteCartsByUser({ username }) {
  try {
    const { rows: cart } = await client.query(/*sql*/`
      SELECT cart.*, users.username AS "creatorName"
      FROM cart
      INNER JOIN users
      ON cart."creatorId" = users.id
      WHERE users.username = $1 AND cart.favorites = true;  
    `, [ username ]);
    return await attachCarsToCarts(cart);
  } catch (error) {
    console.error("Error getting favorite carts by user!", error);
    throw error;
  }
}

async function getActiveCartsByUser({ username }) {
  try {
    const { rows: cart } = await client.query(/*sql*/`
      SELECT cart.*, users.username AS "creatorName"
      FROM cart
      INNER JOIN users
      ON cart."creatorId" = users.id
      WHERE users.username = $1 AND cart."isActive" = true;  
    `, [ username ]);
    return await attachCarsToCarts(cart);
  } catch (error) {
    console.error("Error getting active carts by user!", error);
    throw error;
  }
}

async function getFavoriteCartsByCarId({ id }) {
  try {
    const { rows: cart } = await client.query(/*sql*/`
      SELECT cart.*, 
        cart_items."cartId", 
        cart_items."carId", 
        users.username AS "creatorName"
      FROM cart
      INNER JOIN cart_items
      ON cart.id = cart_items."cartId"  
      INNER JOIN users
      ON cart."creatorId" = users.id
      WHERE cart_items."carId" = $1 AND cart.favorites = true;
    `, [ id ]);
    return await attachCarsToCarts(cart);
  } catch (error) {
    console.error("Error getting favorite carts by carId!", error);
    throw error;
  }
}

async function getActiveCartsByCarId({ id }) {
  try {
    const { rows: cart } = await client.query(/*sql*/`
      SELECT cart.*, 
        cart_items."cartId", 
        cart_items."carId", 
        users.username AS "creatorName"
      FROM cart
      INNER JOIN cart_items
      ON cart.id = cart_items."cartId"  
      INNER JOIN users
      ON cart."creatorId" = users.id
      WHERE cart_items."carId" = $1 AND cart."isActive" = true;
    `, [ id ]);
    return await attachCarsToCarts(cart);
  } catch (error) {
    console.error("Error getting active carts by carId!", error);
    throw error;
  }
}

async function updateCart({ id, ...fields }) {
  const setString = Object.keys(fields).map(
    (key, index) => `"${ key }" = $${ index + 1 }`
  ).join(', ');
  if (setString.length === 0) {
    return;
  }
  try {
    const { rows: [ cart ] } = await client.query(/*sql*/`
      UPDATE cart
      SET ${ setString }
      WHERE id = ${ id }
      RETURNING *;
    `, Object.values(fields));
    return cart;
  } catch (error) {
    console.error("Error updating cart!", error);
  }
}

async function destroyCart(id) {
  try {
    await client.query(/*sql*/`
      DELETE FROM cart_items
      WHERE "cartId" = $1;
    `, [ id ]);
    await client.query(/*sql*/`
      DELETE FROM cart
      WHERE id = ${id}
    `);
  } catch (error) {
    console.error("Error destroying cart!");
    throw error;
  }
}

module.exports = {
  createCart,
  getCartById,
  getCartsWithoutCars,
  getAllCarts,
  getAllFavoriteCarts,
  getAllActiveCarts,
  getAllCartsByUser,
  getFavoriteCartsByUser,
  getActiveCartsByUser,
  getFavoriteCartsByCarId,
  getActiveCartsByCarId,
  updateCart,
  destroyCart
};