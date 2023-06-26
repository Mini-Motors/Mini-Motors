const client = require('../client');

async function createListing({ creatorId, carId, name, color, price }) {
  try {
    const { rows: [ listing ] } = await client.query(/*sql*/`
      INSERT INTO listings ("creatorId", "carId", name, color, price)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
    `, [ creatorId, carId, name, color, price ]);
    return listing;
  } catch (error) {
    console.error("Error creating Listing!", error);
    throw error; 
  }
}

async function getListingsWithoutCars() {
  try {
    const { rows } = await client.query(/*sql*/`
      SELECT * 
      FROM listings    
    `);
    return rows;
  } catch (error) {
    console.error("Error getting listings without a car!", error);
    throw error;
  }
}

module.exports = {
  createListing,
  getListingsWithoutCars
};
