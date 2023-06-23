const client = require('../client');

async function createListing({ creatorId, name, color, price }) {
  try {
    const { rows: [ listing ] } = await client.query(/*sql*/`
      INSERT INTO listings ("creatorId", name, color, price)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `, [ creatorId, name, color, price ]);
    return listing;
  } catch (error) {
    console.error("Error creating Listing!", error);
    throw error; 
  }
}

module.exports = {
  createListing
};