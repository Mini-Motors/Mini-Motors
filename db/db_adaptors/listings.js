const client = require('../client');

async function createListing({ creatorId, name, price }) {
  try {
    const { rows: [ listing ] } = await client.query(/*sql*/`
      INSERT INTO listings ("creatorId", name, price)
      VALUES ($1, $2, $3)
      RETURNING *;
    `, [ creatorId, name, price ]);
    return listing;
  } catch (error) {
    console.error("Error creating Listing!", error);
    throw error; 
  }
}

module.exports = {
  createListing
};