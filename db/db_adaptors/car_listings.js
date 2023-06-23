const client = require('../client');

async function addCarToListing({ carId, listingId }) {
    try {
    const { rows: [ car_listing ] } = await client.query(/*sql*/`
      INSERT INTO car_listings ("carId", "listingId", count, duration)
      VALUES ($1, $2)
      RETURNING *;
    `, [ carId, listingId ]);
    return car_listing;
  } catch (error) {
    console.error("Error adding car to listing!", error);
    throw error; 
  }
}

module.exports = {
  addCarToListing
};