const client = require('../client');

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

async function addCartToUser({
  cartId,
  userId,
}) {
  try {
    const {
      rows: [cart],
    } = await client.query(
      `
      INSERT INTO routine_activities ("cartId, userId")
      VALUES ($1, $2)
      ON CONFLICT ("cartId, userId") DO NOTHING
      RETURNING *;
    `,
      [cartId, userId]
    );

    return cart;
  } catch (error) {
    console.error(error);
  }
}


module.exports = {
  createCart,  
  totalAmount
};



// async function totalAmount({ price }){
//   try {
//     const { rows: [ total ] } = await client.query(/*sql*/`
//       SELECT *
//       FROM cart
//       WHERE id =$1
//       ON CONFLICT (username) DO NOTHING
//       RETURNING *;
//     `, [ price ]);
//     return total;
//   } catch (error) {
//     console.error("Error creating cart!", error);
//     throw error;
//   }
// }