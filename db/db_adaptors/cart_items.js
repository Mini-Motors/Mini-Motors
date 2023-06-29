const client = require('../client');

async function addCarToCartItems({ cartId, carId, currentPrice }) {
    try {
    const { rows: [ cart_item ] } = await client.query(/*sql*/`
      INSERT INTO cart_items ("cartId", "carId", "currentPrice")
      VALUES ($1, $2, $3)
      RETURNING *;
    `, [ cartId, carId, currentPrice ]);
    return cart_item;
  } catch (error) {
    console.error("Error adding item to cart!", error);
    throw error; 
  }
}

async function getCartItemById(id) {
    try {
    const { rows: [ cart_item ] } = await client.query(/*sql*/`
      SELECT * 
      FROM cart_items
      WHERE id = $1
    `, [ id ]);
    return cart_item;
  } catch (error) {
    console.error("Error getting cart item by cartItem Id!", error);
    throw error; 
  }
}

async function getCartItemByCartId({ id }) {
  try {
    const { rows } = await client.query(/*sql*/`
      SELECT * 
      FROM cart_items
      WHERE "cartId" = $1
    `, [ id ]);
    return rows;
  } catch (error) {
    console.error("Error getting car listings by cart ID!", error);
  }
}

async function updateCartItem({ id, ...fields }) {
  const setString = Object.keys(fields).map(
    (key, index) => `"${ key }" = $${ index + 1 }`
  ).join(', ');
  if (setString.length === 0) {
    return;
  }
  try {
    const { rows: [ cart_item ] } = await client.query(/*sql*/`
      UPDATE cart_items
      SET ${ setString }
      WHERE id = ${ id }
      RETURNING *;
    `, Object.values(fields));
    return cart_item;
  } catch (error) {
    console.error("Error updating cart item!", error);
  }
}

async function destroyCartItem(id) {
    try {
    const { rows: [ cart_item ] } = await client.query(/*sql*/`
      DELETE 
      FROM cart_items
      WHERE id = $1
      RETURNING *;
    `, [ id ]);
    return cart_item;
  } catch (error) {
    console.error("Error deleting cart item!", error);
    throw error; 
  }
}

async function canEditCartItem(cartItemId, userId) {
    try {
    const { rows: [ cart_item ] } = await client.query(/*sql*/`
      SELECT * 
      FROM cart_items
      WHERE id = $1
    `, [ cartItemId ]);
    const cartId = car_review.cartId;
    const { rows: [ cart ] } = await client.query(/*sql*/`
      SELECT * 
      FROM cart
      WHERE id = $1
    `, [ cartId ]);
    if (cart.creatorId === userId) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error editing cart item!", error);
    throw error; 
  }
}


module.exports = {
  addCarToCartItems,
  getCartItemById,
  getCartItemByCartId,
  updateCartItem,
  destroyCartItem,
  canEditCartItem
};