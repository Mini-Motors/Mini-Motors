const client = require('../client');

async function addCarToListing({ carId, listingId, extendedPrice = null }) {
    try {
    const { rows: [ car_listing ] } = await client.query(/*sql*/`
      INSERT INTO car_listings ("carId", "listingId", "extendedPrice")
      VALUES ($1, $2, $3)
      RETURNING *;
    `, [ carId, listingId, extendedPrice ]);
    return car_listing;
  } catch (error) {
    console.error("Error adding car to listing!", error);
    throw error; 
  }
}

module.exports = {
  addCarToListing
};