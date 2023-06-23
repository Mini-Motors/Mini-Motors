const client = require('../client');

async function addCarToListing({ carId, listingId, color, extendedPrice = null }) {
    try {
    const { rows: [ car_listing ] } = await client.query(/*sql*/`
      INSERT INTO car_listings ("carId", "listingId", color, "extendedPrice")
      VALUES ($1, $2, $3 $4)
      RETURNING *;
    `, [ carId, listingId, color, extendedPrice ]);
    return car_listing;
  } catch (error) {
    console.error("Error adding car to listing!", error);
    throw error; 
  }
}

module.exports = {
  addCarToListing
};