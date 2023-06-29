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
    console.error("Error creating user!", error);
    throw error;
  }
}

module.exports = {
  createCart,  
};