const client = require('../client');

async function createCart({ userId, isActive, favorites }) {
  try {
    const { rows: [ cart ] } = await client.query(/*sql*/`
      INSERT INTO cart (userId, isActive, favorites) 
      VALUES ($1, $2, $3)
      ON CONFLICT (username) DO NOTHING
      RETURNING *;
    `, [ userId, isActive, favorites ]);
    return cart;
  } catch (error) {
    console.error("Error creating user!", error);
    throw error;
  }
}

module.exports = {
  createCart,  
};